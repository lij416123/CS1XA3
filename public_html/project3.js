window.onload=function()
{
    var iLevel=1;
    var oWrap=document.getElementById("wrap");
    var oScore=document.getElementById("score");
    var oPause=document.getElementById("pause");
    var oRestart=document.getElementById("restart");
    var oLevel=document.getElementById("level");
    var oNext=document.getElementById("next");
    var oTime=document.getElementById("time");
    var oOl=oNext.getElementsByTagName("ol")[0];
    var oAlert=document.getElementById("alert");
    var oSur=document.getElementById("surrender");
    var aLi=[]
    var clock=null;
    oSur.onclick=function()
    {
        oAlert.style.display="none";
    };
    function toDou(iNum)
    {
        if(iNum<10)
        {
            return"0"+iNum;
        }
        else return iNum;
    }
    var oDate=new Date();
    var startTime=oDate.getTime();
    clock=setInterval(function(){
        var NowTime=new Date().getTime();
        var hour=toDou(parseInt((NowTime-startTime)/1000/3600));
        var minute=toDou(parseInt((NowTime-startTime)/1000%3600/60));
        var second=toDou(parseInt((NowTime-startTime)/1000%3600%60));
        oTime.innerHTML=hour+":"+minute+":"+second;
    },1000);
    oTime.innerHTML="00:00:00";
    for(var i=0;i<40;i++)
    {
        aLi[i]=document.createElement("li");
        oOl.appendChild(aLi[i]);
    }
    function clearNext()
    {
        for(var i=0;i<aLi.length;i++)
        {
            aLi[i].className="";
        }
    }
    RussianDiamonds();
    function RussianDiamonds()
    {
        var iRow=18;
        var iCol=10;
        var arr=[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
        var diamond=[];
        var aFinishedRow=[];
        var aShape=[];
        var nowShape=0;
        var nextShape=0;
        var iScore=0;
        var iType=0;
        var bRowFinished=true;
        var bPause=false;
        var bEnd=false;
        var bOver=false;
        var timer=null;
        aShape.push(parseInt(Math.random()*6));
        createBoard();
        oScore.innerHTML=iScore;
        autoDrop();
        oPause.onclick=function()
        {
            if(!bOver)
            {
                if(bPause)
                {
                    oPause.value="Pause";
                    bPause=false;
                    switch(iLevel)
                    {
                        case 1:
                        timer=setInterval(function(){
                            goDown();
                        },800);
                        break;
                        case 2:
                        timer=setInterval(function(){
                            goDown();
                        },600);
                        break;
                        case 3:
                        timer=setInterval(function(){
                            goDown();
                        },400);
                        break;
                    }
                }
                else
                {
                    oPause.value="Continue";
                    bPause=true;
                    clearInterval(timer);
                }
            }
        };
        oRestart.onclick=function()
        {

           window.location.reload();
        };
        function goDown()
        {
            bEnd=false;
            for(var i=0;i<4;i++)
            {
                if(diamond[0][i]==iRow-1)
                {
                    bEnd=true;
                }
            }
            if(!bEnd)
            {
                for(var i=0;i<4;i++)
                {
                    var belowDiamondCol=diamond[0][i]+1;
                    if(arr[belowDiamondCol][diamond[1][i]].className=="finished")
                    {
                        bEnd=true;
                    }
                }
            }
            if(bEnd)
            {
                clearInterval(timer);
                for(var i=0;i<iRow;i++)
                {
                    for(var j=0;j<iCol;j++)
                    {
                       if(arr[i][j].className=="red")
                        {
                            arr[i][j].className="finished";
                        }
                    }
                }
                for(var i=0;i<iRow;i++)
                {
                    bRowFinished=true;
                    for(var j=0;j<iCol;j++)
                    {
                        if(arr[i][j].className!="finished")
                        {
                            bRowFinished=false;
                        }
                    }
                    if(bRowFinished)
                    {
                        aFinishedRow.push(i);
                    }
                }
                while(aFinishedRow.length)
                {
                    for(var i=0;i<aFinishedRow.length;i++)
                    {
                        for(var j=0;j<10;j++)
                        {
                            arr[aFinishedRow[i]][j].className="";
                        }
                    }

                   for(var i=0;i<aFinishedRow.length;i++)
                   {
                        for(var j=aFinishedRow[i]-1;j>=0;j--)
                        {
                            for(var h=0;h<iCol;h++)
                            {
                                if(arr[j][h].className=="finished")
                                {
                                    arr[j][h].className="";
                                    arr[j+1][h].className="finished"
                                }
                            }
                        }
                    }
                    for(var i=1;i<=aFinishedRow.length;i++)
                    {
                        iScore+=i*10;
                    }
                    oScore.innerHTML=iScore;
                    if(iScore>100)
                    {
                        iLevel=2;
                        oLevel.innerHTML=iLevel;
                    }
                    if(iScore>200)
                    {
                        iLevel=3;
                        oLevel.innerHTML=iLevel;
                    }
                    aFinishedRow.length=0;
                }
                autoDrop();
            }
            else
            {
                for(var i=0;i<4;i++)
                {
                    diamond[0][i]++;
                }
                clearScreen();
                showDiamond();
            }
        }
        function autoDrop()
        {
            for(var i=0;i<iCol;i++)
            {
                if(arr[0][i].className=="finished")
                {
                    bOver=true;
                }
            }
            if(bOver)
            {
                clearInterval(clock);
                oAlert.style.display="block";
            }
            else
            {
                createDiamond();
                switch(iLevel)
                {
                    case 1:
                    timer=setInterval(function(){
                        goDown();
                    },800);
                    break;
                    case 2:
                    timer=setInterval(function(){
                        goDown();
                    },600);
                    break;
                    case 3:
                    timer=setInterval(function(){
                        goDown();
                    },400);
                    break;
                }
            }
        }
        function createBoard()
        {
            for(var i=0;i<iRow;i++)
            {
                for(
                    var j=0;j<iCol;j++)
                    {
                        var 
                        newDiv=document.createElement("div");
                        arr[i][j]=newDiv;
                        oWrap.appendChild(newDiv);
                    }
                }
            }
            function createDiamond()
            {
                aShape.push(parseInt(Math.random()*6));
                function enoughSpace(aNew)
                {
                    for(var i=0;i<4;i++)
                    {
                        if(arr[aNew[0][i]][aNew[1][i]].className=="finished")
                        {
                            bOver=true;
                        }
                    }
                    if(!bOver)
                    {
                        diamond=aNew;
                        iType=0;
                    }
                }
                nowShape=aShape.shift();
                nextShape=aShape[0];
                switch(nextShape)
                {
                    case 0:
                    clearNext();
                    aLi[14].className="pink";
                    aLi[15].className="pink";
                    aLi[24].className="pink";
                    aLi[25].className="pink";
                    break;
                    case 1:
                    clearNext();
                    aLi[13].className="pink";
                    aLi[23].className="pink";
                    aLi[24].className="pink";
                    aLi[25].className="pink";
                    break;
                    case 2:
                    clearNext();
                    aLi[13].className="pink";
                    aLi[14].className="pink";
                    aLi[15].className="pink";
                    aLi[16].className="pink";
                    break;
                    case 3:
                    clearNext();
                    aLi[14].className="pink";
                    aLi[23].className="pink";
                    aLi[24].className="pink";
                    aLi[25].className="pink";
                    break;
                    case 4:
                    clearNext();
                    aLi[13].className="pink";
                    aLi[14].className="pink";
                    aLi[24].className="pink";
                    aLi[25].className="pink";
                    break;
                    case 5:
                    clearNext();
                    aLi[15].className="pink";
                    aLi[16].className="pink";
                    aLi[24].className="pink";
                    aLi[25].className="pink";
                    break;
                }
                switch(nowShape)
                {
                    case 0:
                    enoughSpace([[0,0,1,1],[4,5,4,5]]);
                    break;
                    case 1:
                    enoughSpace([[0,1,1,1],[4,4,5,6]]);
                    break;
                    case 2:
                    enoughSpace([[0,0,0,0],[3,4,5,6]]);
                    break;
                    case 3:
                    enoughSpace([[0,1,1,1],[5,4,5,6]]);
                    break;
                    case 4:
                    enoughSpace([[0,0,1,1],[4,5,5,6]]);
                    break;
                    case 5:
                    enoughSpace([[1,1,0,0],[4,5,5,6]]);
                    break;
                }
                showDiamond();
            }
            function clearScreen()
            {
                for(var i=0;i<iRow;i++)
                {
                    for(var j=0;j<iCol;j++)
                    {
                        if(arr[i][j].className!="finished")
                        {
                            arr[i][j].className="";
                        }
                    }
                }
            }
            function showDiamond()
            {
                for(var i=0;i<4;i++)
                {
                    arr[diamond[0][i]][diamond[1][i]].className="red";
                }
            }
            document.onkeydown=function(ev)
            {
                var oEvent=ev||event;
                var bLeftOut=true;
                var bRightOut=true;
                switch(oEvent.keyCode)
                {
                    case 37:
                    bLeftOut=false;
                    for(var i=0;i<4;i++)
                    {
                        if(diamond[1][i]==0)
                        {
                            bLeftOut=true;
                        }
                        else
                        {
                            var iLeftDiamond=diamond[1][i]-1;
                            if(arr[diamond[0][i]][iLeftDiamond].className=="finished")
                            {
                                bLeftOut=true;
                            }
                        }
                    }
                    if(!bLeftOut)
                    {
                        for(var i=0;i<4;i++)
                        {
                            diamond[1][i]--;
                        }
                    }
                    clearScreen();
                    showDiamond();
                    break;
                    case 38:
                    switch(nowShape)
                    {
                        case 1:
                        switch(iType)
                        {
                            case 0:
                            var r1=[
                                diamond[0][0],
                                diamond[0][1]-1,
                                diamond[0][2],
                                diamond[0][3]+1
                            ];
                            var c1=[
                                diamond[1][0]+2,
                                diamond[1][1]+1,
                                diamond[1][2],
                                diamond[1][3]-1
                            ];
                            if(arr[r1[0]][c1[0]].className!="finished"&&
                            arr[r1[1]][c1[1]].className!="finished"&&
                            arr[r1[3]][c1[3]].className!="finished"
                            )
                            {
                                for(var i=0;i<4;i++)
                                {
                                    diamond[0][i]=r1[i];
                                    diamond[1][i]=c1[i];
                                }
                                iType=1;
                                clearScreen();
                                showDiamond();
                            }
                            break;
                            case 1:
                            var r2=[
                                diamond[0][0]+2,
                                diamond[0][1]+1,
                                diamond[0][2],
                                diamond[0][3]-1
                            ];
                            var c2=[
                                diamond[1][0],
                                diamond[1][1]+1,
                                diamond[1][2],
                                diamond[1][3]-1
                            ];
                            if(arr[r2[0]][c2[0]].className!="finished"&&
                            arr[r2[1]][c2[1]].className!="finished"&&
                            arr[r2[3]][c2[3]].className!="finished"
                            )
                            {
                                for(var i=0;i<4;i++)
                                {
                                    diamond[0][i]=r2[i];
                                    diamond[1][i]=c2[i];
                                }
                                iType=2;
                                clearScreen();
                                showDiamond();
                            }
                            break;
                            case 2:
                            var r3=[
                                diamond[0][0],
                                diamond[0][1]+1,
                                diamond[0][2],
                                diamond[0][3]-1
                            ];
                            var c3=[
                                diamond[1][0]-2,
                                diamond[1][1]-1,
                                diamond[1][2],
                                diamond[1][3]+1
                            ];
                            if(arr[r3[0]][c3[0]].className!="finished"&&
                            arr[r3[1]][c3[1]].className!="finished"&&
                            arr[r3[3]][c3[3]].className!="finished"
                            )
                            {
                                for(var i=0;i<4;i++)
                                {
                                    diamond[0][i]=r3[i];
                                    diamond[1][i]=c3[i];
                                }
                                iType=3;
                                clearScreen();
                                showDiamond();
                            }
                            break;
                            case 3:
                            var r0=[
                                diamond[0][0]-2,
                                diamond[0][1]-1,
                                diamond[0][2],
                                diamond[0][3]+1
                            ];
                            var c0=[
                                diamond[1][0],
                                diamond[1][1]-1,
                                diamond[1][2],
                                diamond[1][3]+1
                            ];
                            if(arr[r0[0]][c0[0]].className!="finished"&&
                            arr[r0[1]][c0[1]].className!="finished"&&
                            arr[r0[3]][c0[3]].className!="finished"
                            )
                            {
                                for(var i=0;i<4;i++)
                                {
                                    diamond[0][i]=r0[i];
                                    diamond[1][i]=c0[i];
                                }
                                iType=0;
                                clearScreen();
                                showDiamond();
                            }
                            break;
                        }
                        break;
                        case 2:
                        switch(iType)
                        {
                            case 0:
                            var r1=[
                                diamond[0][0]-1,
                                diamond[0][1],
                                diamond[0][2]+1,
                                diamond[0][3]+2
                            ];
                            var c1=[
                                diamond[1][0]+1,
                                diamond[1][1],
                                diamond[1][2]-1,
                                diamond[1][3]-2
                            ];
                            if(arr[r1[0]][c1[0]].className!="finished"&&
                            arr[r1[2]][c1[2]].className!="finished"&&
                            arr[r1[3]][c1[3]].className!="finished"
                            )

                           {
                                for(var i=0;i<4;i++)
                                {
                                    diamond[0][i]=r1[i];
                                    diamond[1][i]=c1[i];
                                }
                                iType=1;
                                clearScreen();

                               showDiamond();
                            }
                            break;
                            case 1:
                            var r0=[
                                diamond[0][0]+1,

                               diamond[0][1],
                                diamond[0][2]-1,

                               diamond[0][3]-2
                            ];
                            var c0=[
                                diamond[1][0]-1,
                                diamond[1][1],
                                diamond[1][2]+1,
                                diamond[1][3]+2
                            ];
                            if(arr[r0[0]][c0[0]].className!="finished"&&

                           arr[r0[2]][c0[2]].className!="finished"&&
                            arr[r0[3]][c0[3]].className!="finished"
                            )
                            {
                                for(var i=0;i<4;i++)
                                {
                                    diamond[0][i]=r0[i];
                                    diamond[1][i]=c0[i];
                                }
                                iType=0;
                                clearScreen();
                                showDiamond();
                            }
                            break;
                        }
                        break;
                        case 3:
                        switch(iType)
                        {
                            case 0:
                            var r1=[
                                diamond[0][0]+1,
                                diamond[0][1]-1,
                                diamond[0][2],
                                diamond[0][3]+1
                            ];
                            var c1=[
                                diamond[1][0]+1,

                               diamond[1][1]+1,
                                diamond[1][2],
                                diamond[1][3]-1
                            ];
                            if(arr[r1[0]][c1[0]].className!="finished"&&
                            arr[r1[1]][c1[1]].className!="finished"&&
                            arr[r1[3]][c1[3]].className!="finished"
                            )
                            {
                                for(var i=0;i<4;i++)
                                {
                                    diamond[0][i]=r1[i];
                                    diamond[1][i]=c1[i];
                                }
                                iType=1;
                                clearScreen();
                                showDiamond();
                            }
                            break;
                            case 1:
                            var r2=[
                                diamond[0][0]+1,
                                diamond[0][1]+1,
                                diamond[0][2],
                                diamond[0][3]-1
                            ];
                            var c2=[
                                diamond[1][0]-1,
                                diamond[1][1]+1,
                                diamond[1][2],
                                diamond[1][3]-1
                            ];
                            if(arr[r2[0]][c2[0]].className!="finished"&&
                            arr[r2[1]][c2[1]].className!="finished"&&
                            arr[r2[3]][c2[3]].className!="finished"
                            )
                            {
                                for(var i=0;i<4;i++)
                                {
                                    diamond[0][i]=r2[i];
                                    diamond[1][i]=c2[i];
                                }
                                iType=2;
                                clearScreen();
                                showDiamond();
                            }
                            break;
                            case 2:
                            var r3=[
                                diamond[0][0]-1,
                                diamond[0][1]+1,
                                diamond[0][2],
                                diamond[0][3]-1
                            ];
                            var c3=[
                                diamond[1][0]-1,
                                diamond[1][1]-1,
                                diamond[1][2],
                                diamond[1][3]+1
                            ];
                            if(arr[r3[0]][c3[0]].className!="finished"&&
                            arr[r3[1]][c3[1]].className!="finished"&&
                            arr[r3[3]][c3[3]].className!="finished"
                            )
                            {
                                for(var i=0;i<4;i++)
                                {
                                    diamond[0][i]=r3[i];
                                    diamond[1][i]=c3[i];
                                }
                                iType=3;
                                clearScreen();
                                showDiamond();
                            }
                            break;
                            case 3:
                            var r0=[
                                diamond[0][0]-1,
                                diamond[0][1]-1,
                                diamond[0][2],
                                diamond[0][3]+1
                            ];
                            var c0=[
                                diamond[1][0]+1,
                                diamond[1][1]-1,
                                diamond[1][2],
                                diamond[1][3]+1
                            ];
                            if(arr[r0[0]][c0[0]].className!="finished"&&
                            arr[r0[1]][c0[1]].className!="finished"&&
                            arr[r0[3]][c0[3]].className!="finished"
                            )
                            {
                                for(var i=0;i<4;i++)
                                {
                                    diamond[0][i]=r0[i];
                                    diamond[1][i]=c0[i];
                                }
                                iType=0;
                                clearScreen();
                                showDiamond();
                           }
                            break;
                        }
                        break;
                        case 4:
                        switch(iType)
                        {
                           case 0:
                            var r1=[
                                diamond[0][0]-1,
                                diamond[0][1],
                                diamond[0][2],
                                diamond[0][3]-1
                            ];
                            var c1=[
                                diamond[1][0]+2,
                                diamond[1][1],
                                diamond[1][2],
                                diamond[1][3]
                            ];
                            if(arr[r1[0]][c1[0]].className!="finished"&&
                            arr[r1[3]][c1[3]].className!="finished"
                            )
                            {
                                for(var i=0;i<4;i++)
                                {
                                    diamond[0][i]=r1[i];
                                    diamond[1][i]=c1[i];
                                }
                                iType=1;
                                clearScreen();
                                showDiamond();
                            }
                            break;
                            case 1:
                            var r0=[
                                diamond[0][0]+1,
                                diamond[0][1],
                                diamond[0][2],
                                diamond[0][3]+1
                            ];
                            var c0=[
                                diamond[1][0]-2,
                                diamond[1][1],
                                diamond[1][2],
                                diamond[1][3]
                            ];
                            if(arr[r0[0]][c0[0]].className!="finished"&&
                            arr[r0[3]][c0[3]].className!="finished"
                            )
                            {
                                for(var i=0;i<4;i++)
                                {
                                    diamond[0][i]=r0[i];
                                    diamond[1][i]=c0[i];
                                }
                                iType=0;
                                clearScreen();
                                showDiamond();
                            }
                            break;
                        }
                        break;
                        case 5:
                        switch(iType)
                        {
                            case 0:
                            var r1=[
                                diamond[0][0]-2,
                                diamond[0][1],
                                diamond[0][2],
                                diamond[0][3]
                            ];
                            var c1=[
                                diamond[1][0]+1,
                                diamond[1][1]+1,
                                diamond[1][2],
                                diamond[1][3]
                            ];
                            if(arr[r1[0]][c1[0]].className!="finished"&&
                            arr[r1[1]][c1[1]].className!="finished"
                            )
                            {
                                for(var i=0;i<4;i++)
                                {
                                    diamond[0][i]=r1[i];
                                    diamond[1][i]=c1[i];
                                }
                                iType=1;
                                clearScreen();
                                showDiamond();
                            }
                            break;
                            case 1:
                            var r0=[
                                diamond[0][0]+2,
                                diamond[0][1],
                                diamond[0][2],
                                diamond[0][3]
                            ];
                            var c0=[
                                diamond[1][0]-1,
                                diamond[1][1]-1,
                                diamond[1][2],
                                diamond[1][3]
                            ];
                            if(arr[r0[0]][c0[0]].className!="finished"&&
                            arr[r0[1]][c0[1]].className!="finished"
                            )
                            {
                                for(var i=0;i<4;i++)
                                {
                                    diamond[0][i]=r0[i];
                                    diamond[1][i]=c0[i];
                                }
                                iType=0;
                                clearScreen();
                                showDiamond();
                            }
                            break;
                        }
                        break;
                    }
                    break;
                    case 39:
                    bLeftOut=false;
                    for(var i=0;i<4;i++)
                    {
                        if(diamond[1][i]==9)
                        {
                            bLeftOut=true;
                        }
                        else
                        {
                            var iRightDiamond=diamond[1][i]+1;
                            if(arr[diamond[0][i]][iRightDiamond].className=="finished")
                            {
                                bLeftOut=true;
                            }
                        }
                    }
                    if(!bLeftOut)
                    {
                        for(var i=0;i<4;i++)
                        {
                            diamond[1][i]++;
                        }
                    }
                    clearScreen();
                    showDiamond();
                    break;
                    case 40:
                    goDown();
                    break;
                }
            };
        };
    };

