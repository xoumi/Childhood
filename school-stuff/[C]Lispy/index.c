#include <stdlib.h>
#include <stdio.h>
#include <string.h>
#include <editline/readline.h>
#include "mpc/mpc.h"

#define BUFFERSIZE 1000
static char* input;

#ifdef _WIN32
char * readline(char * prompt) {
    fputs(prompt, stdout);
    fgets(input, BUFFERSIZE, stdin);
    char *temp = malloc(strlen(input) + 1);
    strcpy(temp, input);
    temp[strlen(temp) - 1] = '\0';
    return temp;
}
void add_history(char* a) {} //Unused function

#else
#include <editline/readline.h>
#endif

//Structs
typedef struct {
    int type;
    long num;
    int err;
} lval;

enum { LVAL_NUM, LVAL_ERR };
enum { DIV_ZERO, BAD_OP, BAD_NUM };

//Functions
lval lval_num(long n) {
    lval constructor;
    constructor.type = LVAL_NUM;
    constructor.num = n;
    return constructor;
}
lval lval_err(int x) {
    lval constructor;
    constructor.type = LVAL_ERR;
    constructor.err = x;
    return constructor;
}
void lval_print(lval n) {

    switch(n.type) {

        case LVAL_NUM: 
            printf("%li\n", n.num);
            break;

        case LVAL_ERR:
            if(n.err == DIV_ZERO)
                printf("Error: Division by Zero\n");
            if(n.err == BAD_OP)
                printf("Error: Invalid Operator\n");
            if(n.err == BAD_NUM)
                printf("Error: Bad Number\n");
            break;
    }
}

lval eval_op(lval x, char * op, lval y) {

    if(x.type == LVAL_ERR) { return x; }
    if(y.type == LVAL_ERR) { return y; }

    if(strcmp(op, "+") == 0) { return lval_num(x.num + y.num); }
    if(strcmp(op, "-") == 0) { return lval_num(x.num - y.num); }
    if(strcmp(op, "*") == 0) { return lval_num(x.num * y.num); }
    if(strcmp(op, "/") == 0) { return y.num == 0 ? lval_err(DIV_ZERO) : lval_num(x.num / y.num); }
    if(strcmp(op, "%") == 0) { return lval_num(x.num % y.num); }
    if(strcmp(op, "add") == 0) { return lval_num(x.num + y.num); }
    if(strcmp(op, "sub") == 0) { return lval_num(x.num - y.num); }
    if(strcmp(op, "mul") == 0) { return lval_num(x.num * y.num); }
    if(strcmp(op, "div") == 0) { return y.num == 0 ? lval_err(DIV_ZERO) : lval_num(x.num / y.num); }
    if(strcmp(op, "mod") == 0) { return lval_num(x.num % y.num); }
    if(strcmp(op, "min") == 0) { return lval_num(x.num < y.num ? x.num : y.num); }
    if(strcmp(op, "max") == 0) { return lval_num(x.num > y.num ? x.num : y.num); }

    return lval_err(BAD_OP);
}
lval eval(mpc_ast_t* t) {

    //Base case. In this case,
    //The function returns the contents itself if tag type = number
    if(strstr(t -> tag, "number")) {
        errno = 0;
        long x = strtol(t -> contents, NULL, 10);
        return errno != ERANGE ? lval_num(x) : lval_err(BAD_NUM);
    }

    char * op = t -> children[1] -> contents;
    lval x = eval(t -> children[2]);

    int i = 3;
    while(strstr(t -> children[i] -> tag, "expr")) {
        x = eval_op(x, op, eval(t -> children[i]));
        i++;
    }

    return x;
}


int main(int argc, char ** argv[]) {

    //Parser Grammar Initialization

    mpc_parser_t * Number = mpc_new("number");
    mpc_parser_t * Operator = mpc_new("operator");
    mpc_parser_t * Expr = mpc_new("expr");
    mpc_parser_t * Lispy = mpc_new("lispy");

    mpca_lang(MPCA_LANG_DEFAULT,
        "                                                   \
        number    : /-?[0-9]+/; \
        operator  : '+' | '-' | '*' | '/' | '%' | \"add\" | \"sub\" | \"mul\" | \"div\" | \"mod\" | \"min\" | \"max\"; \
        expr      : <number> | '('<operator> <expr>+')'; \
        lispy     : /^/<operator> <expr>+ /$/;     \
        ",
        Number, Operator, Expr, Lispy);
    // Parser Grammer Over

    //Welcome
    puts("Press Ctrl+C or type \"exit\" to  exit\n");

    while (1) {

        input = readline(">> ");
        add_history(input);

        if(strcmp(input, "exit") == 0)
            break;

        //Parse the input
        mpc_result_t r;
        if(mpc_parse("<stdin>", input, Lispy, &r)) {

            lval result = eval(r.output);
            lval_print(result);
            mpc_ast_delete(r.output);

        } else {

            //If not successful
            mpc_err_print(r.error);
            mpc_err_delete(r.error);

        }

        free(input);
    }

    mpc_cleanup(4, Number, Operator, Expr, Lispy);
    return 0;
}
