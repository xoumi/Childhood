#include<iostream>
using namespace std;

/*
Solution to Euler Project Problem number 19.
How many Sundays fell on the first of the month during the twentieth century (1 Jan 1901 to 31 Dec 2000)?
Where the date of the First Sunday is given as m;

We start with a starting date for the first Sunday, between 1 and 7.
Then we add 31 or 30 to it for each month keeping the year (leap or not), month(31, 30, 29, 28) in mind.
The by subtracting the surplus, we get the date of Sunday of next month.
We increase counter if Sunday is 1, else we keep looping through the months and years.
*/

int monthDisplay(int, int *);
bool leap(int);

int main(int argc, char* argv[])
{
    int month = 0, sunDays = 0, dateSun, total = 0;
    dateSun = atoi(argv[1]);

    //Date must be within 1-7
    if(dateSun > 7 || dateSun < 1) {
        cout << "Invalid date. Must be within 1 - 7";
        return 1;
    }

    for(int yearNo=1901; yearNo<2001; yearNo++)
        if(leap(yearNo))
            for(month = 1; month < 13; month++)
                switch(month) {
                    case 1: case 3: case 5: case 7: case 8: case 10: case 12:
                        sunDays += monthDisplay(31, &dateSun);
                        break;
                    case 4: case 6: case 9: case 11:
                        sunDays += monthDisplay(30, &dateSun);
                        break;
                    case 2:
                    sunDays += monthDisplay(29, &dateSun);
                }
        else
            for(month = 1; month < 13; month++)
                switch(month) {
                    case 1: case 3: case 5: case 7: case 8: case 10: case 12:
                        sunDays += monthDisplay(31, &dateSun);
                        break;
                    case 4: case 6: case 9: case 11:
                        sunDays += monthDisplay(30, &dateSun);
                        break;
                    case 2:
                    sunDays += monthDisplay(28, &dateSun);
                }
    cout << sunDays << "\n";
    return 0;
}

int monthDisplay(int days, int *dateSun) {
    int ans = 0;
    for( ; *dateSun <= days; *dateSun += 7)
        ans += (*dateSun == 1) ? 1 : 0;
        //cout << *dateSun << ",";
    *dateSun -= days;
    // cout << ans << "\n" ;
    // cout << " " << *dateSun << "\n";
    return ans;
}

//Function to determine year Leap or not
bool leap(int year) {
    return ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) ? true : false;
}
