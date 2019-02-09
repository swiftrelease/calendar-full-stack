function checkCollision(eventArr) {
  for (var i = 0; i < eventArr.length; i++) {
    eventArr[i].cols = [];
    eventArr[i].colsBefore=[];
    for (var j = 0; j < eventArr.length; j++) {
      if (collidesWith(eventArr[i], eventArr[j])) {
        eventArr[i].cols.push(j);
        if(i>j) eventArr[i].colsBefore.push(j); //also list which of the conflicts came before
      }
    }
  }
  return eventArr;
}

function updateEvents(eventArr) {
  eventArr = checkCollision(eventArr);
  var arr=eventArr.slice(0); //clone the array
  for(var i=0; i<arr.length; i++){
    var el=arr[i];
    el.color = getRandomColor();
    el.height = (el.end - el.start) * 2 + 'px';
    el.top = (el.start) * 2 + 'px';

    if(i>0 && el.colsBefore.length>0){ //check column if not the first event and the event has collisions with prior events
      if(arr[i-1].column>0){ //if previous event wasn't in the first column, there may be space to the left of it
        for(var j=0;j<arr[i-1].column;j++){ //look through all the columns to the left of the previous event
          if(el.colsBefore.indexOf(i-(j+2))===-1){ //the current event doesn't collide with the event being checked...
            el.column=arr[i-(j+2)].column; //...and can be put in the same column as it
          }
        }
        if(typeof el.column==='undefined') el.column=arr[i-1].column+1; //if there wasn't any free space, but it ito the right of the previous event
      }else{
        var column=0;
        for(var j=0;j<el.colsBefore.length;j++){ //go through each column to see where's space...
          if(arr[el.colsBefore[el.colsBefore.length-1-j]].column==column) column++;
        }
        el.column=column;
      }
    }else el.column=0;
  }
  //We need the column for every event before we can determine the appropriate width and left-position, so this is in a different for-loop:
  for(var i=0; i<arr.length; i++){
    arr[i].totalColumns=0;
    if(arr[i].cols.length>1){ //if event collides
      var conflictGroup=[]; //store here each column in the current event group
      var conflictingColumns=[]; //and here the column of each of the events in the group
      addConflictsToGroup(arr[i]);
      function addConflictsToGroup(a){
        for(k=0;k<a.cols.length;k++){
          if(conflictGroup.indexOf(a.cols[k])===-1){ //don't add same event twice to avoid infinite loop
            conflictGroup.push(a.cols[k]);
            conflictingColumns.push(arr[a.cols[k]].column);
            addConflictsToGroup(arr[a.cols[k]]); //check also the events this event conflicts with
          }
        }
      }
      arr[i].totalColumns=Math.max.apply(null, conflictingColumns); //set the greatest value as number of columns
    }
    arr[i].width=(600/(arr[i].totalColumns+1))+'px';
    arr[i].left=(600/(arr[i].totalColumns+1)*arr[i].column)+'px';
  }
  return arr;
}
