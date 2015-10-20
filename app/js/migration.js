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
        if (workingList[i] == 427)
            workingList[i] = 428;
        else if (workingList[i] > 427)
            workingList[i] --;
    }
}