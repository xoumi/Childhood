#include<stdlib.h>
#include<string.h>
#include<math.h>

#include "hash_table.h"
#include "prime.c"

const int PRIME1 = 151;
const int PRIME2 = 163;
static element DELETED = {NULL, NULL};

//Constructor Functions
static element* newElement(const char* k, const char* v) {
    element* i = malloc(sizeof(element));
    i -> key = strdup(k);
    i -> value = strdup(v);
    return i;
}
table* TableSized(const int base) {
    table* i = malloc(sizeof(table));
    i -> base = base;
    i -> length = nextPrime(i -> base);
    i -> count = 0;
    i -> elements = calloc((size_t) i -> length, sizeof(element*));
}
table * newTable() {
    return TableSized(53);
}

//Deconstructor Functions
void delElement(element* i) {
    free(i -> key);
    free(i -> value);
    free(i);
}
void delTable(table* t) {
    for (int i = 0; i < t -> length; i++) {
        element* e = t -> elements[i];
        if (e != NULL)
            delElement(e);
    }
    free(t -> elements);
    free(t);
}

//Hash Functions
static int hash(const char * s, const int prime, const int range) {
    long hash = 0;
    const int length = strlen(s);
    for (int i = 0; i < length; i++) {
        hash += (long) pow(prime, (length - (i+1))) * s[i];
        hash = hash % range;
    }
    return (int) hash;
}
static int getHash(const char * s, const int range, const int attempt) {
    const int hashA = hash(s, PRIME1, range);
    const int hashB = hash(s, PRIME2, range);
    return (hashA + (attempt * (hashB + 1))) % range;
}

//Hash Methods
void insert(table * t, const char * key, const char * value) {
    element * toInsert = newElement(key, value);
    int index = getHash(toInsert -> key, t -> length, 0);
    element * current = t -> elements[index];

    //Check if the current index is taken already, if yes, assign new index.
    //If it is a previously deleted element, use it as index.
    int i = 1;
    while (current != NULL && current != &DELETED) {
        if (strcmp(current -> key, key) == 0) {
            delElement(current);
            t -> elements[index] = toInsert;
            return;
        }
        index = getHash(toInsert -> key, t -> length, i);
        current = t -> elements[index];
        i++;
    }

    t -> elements[index] = toInsert;
    t -> count++;
}
char * search(table * t, const char * key) {
    int index = getHash(key, t -> length, 0);
    element * toCheck = t -> elements[index];
    int i = 1;

    //After retrieving index for key, compare that index for requested key.
    //If matched, return value, else find next index.
    //If NULL encountered, key doesn't exist, return NULL.
    //If DELETED is encountered, treat it as a taken index and proceed as usual.
    while (toCheck != NULL) {
        if (toCheck != &DELETED)
            if (strcmp(toCheck -> key, key) == 0)
                return toCheck -> value;
        index = getHash(key, t -> length, i);
        toCheck = t -> elements[index];
        i++;
    }
    return NULL;
}
void delete(table * t, const char * key) {
    int index = getHash(key, t -> length, 0);
    element * current = t -> elements[index];
    int i = 1;

    //Instead of entirely deleting an element, mark it as deleted.
    //So that it does not destroy the double hash chain.
    //A marked element can be replaced when inserting and skipped when
    //searching.
    while (current != NULL) {
        if (current != &DELETED)
            if (strcmp(current -> key, key) == 0) {
                delElement(current);
                t -> elements[index] = &DELETED;
            }
        index = getHash(key, t -> length, i);
        current = t -> elements[index];
        i++;
    }
    //Only decrease count if user gave key to existing pair.
    if (current == NULL)
        return;
    t -> count--;
}


int main() {
    table * t = newTable();
    delTable(t);
}
