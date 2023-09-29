let a = Math.floor(Math.random() * 100);

console.log(a + ' => ' + logicalCondition(a));

function logicalCondition(a) {
    if (a * 2 > 5) {
        return (2 * a) + 1;
    } else {
        if (a > 3 && ((a - 2) > 2)) {
            return 5;
        } else {
            if (a % 2 == 0) {
                return 6;
            } else {
                return 7;
            }
        }
    }
}