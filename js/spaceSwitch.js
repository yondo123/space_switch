$(document).ready(function () {
    var memberList = [ //멤버 정보 객체 (이름, 분단 이력, 세부자리 이력)
        { name: "김현희", divArr: [2, 1], seatArr: [3, 2] },
        { name: "황인준", divArr: [3, 1], seatArr: [4, 3] },
        { name: "한상빈", divArr: [2, 1], seatArr: [2, 1] },
        { name: "심승경", divArr: [3, 2], seatArr: [3, 1] },
        { name: "김소희", divArr: [3, 2], seatArr: [2, 2] },
        { name: "김진태", divArr: [3, 2], seatArr: [1, 3] },
        { name: "송유찬", divArr: [1, 2], seatArr: [2, 4] },
        { name: "최승진", divArr: [2, 3], seatArr: [4, 1] },
        { name: "전혜원", divArr: [1, 3], seatArr: [3, 2] },
        { name: "기도희", divArr: [2, 3], seatArr: [1, 3] }, 
        { name: "서은정", divArr: [1, 3], seatArr: [1, 4] }
    ];

    var divCount = [0,0,0]; //자리 잔여 갯수 배열
    var firstDiv = {seatOne : true, seatTwo : true, seatThree:true} //1분단 객체
        ,secondDiv = {seatOne : true, seatTwo : true, seatThree:true, seatFour:true} //2분단 객체
        ,thirdDiv = {seatOne : true, seatTwo : true, seatThree:true, seatFour:true}; //3분단 객체

    $("#setSeat").on("click", function () { //자리배치 버튼
         $("#setSeat").prop("disabled", true);
        initObject();
        assignSeat(memberList);
    });

    $("#randomSeat").on("click", function () { //자리섞기 버튼
        $("#setSeat").prop("disabled", false);
        initObject(); //객체 초기화
        randomArray(memberList);
        console.log("인원 섞기 완료");
    });

    function assignSeat(memberList) { //자리배치
        var seatSortArr=[0,0,0,0,0,0,0,0,0,0,0]; //렌더링에 사용 할 배열
        for(var i in memberList){ 
            console.log('이름 : ' + memberList[i].name + '\n' + '앉았던 분단 : ' + memberList[i].divArr + '\n' + '앉았던 자리 : ' + memberList[i].seatArr);
            var divArray = memberList[i].divArr //분단 배열
                ,seatArray = memberList[i].seatArr //자리 배열    
                ,arrayLength = memberList[i].divArr.length //배열 길이 값
                ,curDiv = memberList[i].divArr[arrayLength-1]
                ,prevDiv = memberList[i].divArr[arrayLength-2]
                ,posSeat = [], tempDiv =[]; //(분단)예정배열, 임시배열
                tempDiv = prioritizeDiv(curDiv, prevDiv);
                if(arrayLength>10){
                    divArray.splice(0,1); 
                    seatArray.splice(0,1);
                } 
                var seatChk = false;
                while(true){
                    if(seatChk) break; //자리에 배치되면 loop 탈출
                    var divNum = tempDiv[0];//임시 분단
                    console.log('seat Status : ' + divCount[0] + ' , ' + divCount[1] + ' , ' + divCount[2]);
                    if(divNum==1 && divCount[0]<3){
                        var tempSeat = [1,2,3];
                        var seatCnt = 1;
                        for(var key in firstDiv){
                            seatNum=tempSeat[0];
                            posSeat.push(divNum); //예상분단 자리에 넣는다.
                            posSeat.push(tempSeat[0]);
                            if(seatCnt==seatNum){
                                if (firstDiv[key] && validationSeat(posSeat, divArray, seatArray)) { //자리 잔여 검사
                                    firstDiv[key] = false; //false로 변경
                                    memberList[i].divArr.push(divNum);
                                    memberList[i].seatArr.push(seatCnt);
                                    divCount[0]++; //분단 증가
                                    tempSeat.splice(tempSeat.indexOf(seatNum), 1); //해당 자리 삭제
                                    seatChk=true; //빠져나옴
                                    break;
                                } else {
                                    tempSeat.splice(0, 1);
                                }
                            }
                            posSeat.splice(0, posSeat.length);
                            seatCnt++;
                        }
                    }else if(divNum==2 && divCount[1]<4){
                        var tempSeat = [1,2,3,4];
                        var seatCnt = 1;
                        for(var key in secondDiv){
                            seatNum=tempSeat[0];
                            posSeat.push(divNum); //예상분단 자리
                            posSeat.push(tempSeat[0]);
                            if(seatCnt==seatNum){
                                if (secondDiv[key] && validationSeat(posSeat, divArray, seatArray)) { //자리 잔여 검사
                                    secondDiv[key] = false; //false로 변경
                                    memberList[i].divArr.push(divNum);
                                    memberList[i].seatArr.push(seatCnt);
                                    divCount[1]++; //분단 증가
                                    tempSeat.splice(tempSeat.indexOf(seatNum), 1); //해당 자리 삭제
                                    seatChk=true; //빠져나옴
                                    break;
                                } else {
                                    tempSeat.splice(0, 1);
                                }
                            }
                            posSeat.splice(0, posSeat.length);
                            seatCnt++;
                        }
                    }else if(divNum==3 && divCount[2]<4){
                        var tempSeat = [1,2,3,4];
                        var seatCnt = 1;
                        for(var key in thirdDiv){
                            seatNum=tempSeat[0];
                            posSeat.push(divNum); //예상분단 자리에 넣는다.
                            posSeat.push(tempSeat[0]);
                            if(seatCnt==seatNum){
                                if (thirdDiv[key] && validationSeat(posSeat, divArray, seatArray)) {//자리 잔여 검사
                                    thirdDiv[key] = false; //false로 변경
                                    memberList[i].divArr.push(divNum);
                                    memberList[i].seatArr.push(seatCnt);
                                    divCount[2]++; //분단 증가
                                    tempSeat.splice(tempSeat.indexOf(seatNum), 1); //해당 자리 삭제
                                    seatChk=true; //빠져나옴
                                    break;
                                } else {
                                    tempSeat.splice(0, 1);
                                }
                            }
                            posSeat.splice(0, posSeat.length);
                            seatCnt++;
                        }
                    }else { //예정 자리에 못 앉을시 남는자리에 투입
                        if(tempDiv.length==0){
                            console.log(thirdDiv);
                            var objProperties = ['seatOne','seatTwo','seatThree', 'seatFour'];
                            var extraIndex=seatSortArr.indexOf(0);
                            seatSortArr.splice(extraIndex,1,memberList[i].name);  
                            if(extraIndex>=0&&extraIndex<=2){
                                divCount[0]++;
                                var value = objProperties[extraIndex];
                                firstDiv[value] = false;
                                memberList[i].divArr.push(1);
                                memberList[i].seatArr.push(extraIndex+1);                               
                            }else if(extraIndex>=3&&extraIndex<=6){
                                divCount[1]++;
                                var value = objProperties[extraIndex-3];
                                secondDiv[value] = false;
                                memberList[i].divArr.push(2);
                                memberList[i].seatArr.push(extraIndex-2); 
                            }else{
                                divCount[2]++;
                                var value = objProperties[extraIndex-7];
                                thirdDiv[value] = false;
                                memberList[i].divArr.push(3);
                                memberList[i].seatArr.push(extraIndex-6); 
                            }
                            seatChk = true;
                        }                        
                    }
                tempDiv.splice(0, 1); //해당 우선순위 삭제
                }//endDivArray loop
                var divLastLength = memberList[i].divArr.length
                    ,seatLastLength = memberList[i].seatArr.length;
                var lastSeat = memberList[i].seatArr[seatLastLength-1]
                    ,lastDiv =memberList[i].divArr[divLastLength-1];
                tempDiv.splice(0, tempDiv.length);
                switch (memberList[i].divArr[divLastLength-1]) { //렌더링 배열(seatSort)에 배치 멤버 삽입
                    case 1:
                        seatSortArr.splice(lastSeat-lastDiv,1,memberList[i].name);
                        break;               
                    case 2:
                        seatSortArr.splice(lastDiv+lastSeat,1,memberList[i].name);
                        break;
                    case 3:
                        seatSortArr.splice((lastDiv*2+lastSeat),1,memberList[i].name);
                        break;
                }
                
        }//endMemberlist loop
        console.table(seatSortArr);
        console.table(divCount);
        seatRender(seatSortArr);
    }


    function initObject() { //자리 객체(배열) 초기화
        divCount.splice(0,divCount.length,0,0,0);
        for(var key in firstDiv)
            firstDiv[key] = true;
        for(var key in secondDiv){
            secondDiv[key] = true;
            thirdDiv[key] = true;
        }
        return; 
    }

    function prioritizeDiv(curDiv,prevDiv) { //분단 우선순위 지정
        var divValue = [1,2,3];
        if(curDiv==prevDiv){//최근 앉았던 분단과 이전 앉았던 분단이 같을 때
            divValue.splice(divValue.indexOf(curDiv),1);
            randomArray(divValue);
        }else{ //
            divValue.splice(divValue.indexOf(curDiv), 1); //최근 자리 제거
            divValue.splice(divValue.indexOf(prevDiv), 1); //이전 자리 제거
            divValue.push(prevDiv,curDiv);
        }
        return divValue;
    }

    function randomArray(array){ //배열 랜덤 정렬
        array.sort(function () {
             return Math.random() - Math.random() 
        });
        return array;
    }

    function compareArray(arrA, arrB){ //배열 비교 함수
        if(arrA == arrB ) return true;
        if(arrA == null || arrB == null) return false;
        if(arrA.length != arrB.length) return false;
        for(var i = 0; i<arrA.length; i++){
            if(arrA[i]!==arrB[i]) return false;
        }
        return true;
    }

    function seatRender(array) { //자리 배치 렌더링
        var $seat = $('.spaceWrap li').not('li.empty');
        var index = 0;
        $seat.each(function () {
           $(this).text(array[index]);
            index++;
        });
    }

    function validationSeat(array, divArray, seatArray) { //자리검사
        var compareArr = [];
        for(var i=0; i < divArray.length; i++){
            compareArr.push(divArray[i]);
            compareArr.push(seatArray[i]);
            if(compareArray(array,compareArr)){ //앉았던 배열과 중복
                 return false;
             } 
            compareArr.splice(0,compareArr.length);
        }
        return true;
    }
});