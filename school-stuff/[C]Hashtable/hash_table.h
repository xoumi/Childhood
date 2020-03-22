#define LENGTH 53;

typedef struct {
    char* key;
    char* value;
} element;

typedef struct {
    int base;
    int length;
    int count;
    element** elements;
} table;

