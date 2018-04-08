#include <iostream>
using namespace std;

const char* const MONTH_NAME[] = {
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
};

const char* GetMonthName(int month) {
  if(1 <= month && month <= 12) {
    return MONTH_NAME[month -1];
  }
  return 0;
}

int main() {
  int month;

  cout << "Ima ha Nangatu Desuka? > " << flush;
  cin >> month;

  const char* name = GetMonthName(month);
  if(name == 0) {
    cout << "Nothing" << endl;
  } else {
    cout << name << endl;
  }
}
