/**
 * Created by ZQLan on 15/10/20.
 */
function migration() {
    for (var i = lastVersion + 1; i <= version ; i++) {
        eval("(migration_"+i+"());");
    }
}

function migration_2() {
    for(var i = 0 ; i < workingList.length ; i++) {
        if (workingList[i] == 427)
            workingList[i] = 428;
        else if (workingList[i] > 427)
            workingList[i] --;
    }
    for(var i = 0 ; i < reviewList.length ; i++) {
        if (reviewList[i] == 427)
            reviewList[i] = 428;
        else if (reviewList[i] > 427)
            reviewList[i] --;
    }
}

function migration_3() {
    for(var i = 0 ; i < workingList.length ; i++) {
        if (workingList[i] == 647) {
            workingList.splice(i, i);
            i--;
        }
    }
    for(var i = 0 ; i < reviewList.length ; i++) {
        if (reviewList[i] == 647) {
            reviewList.splice(i, i);
            i--;
        }
    }
}