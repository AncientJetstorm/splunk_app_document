
function goHome() {
    var temp = document.URL.substr(0, document.URL.search("6_2_3"));
    window.open(temp + "home", "_self");
}

function switchVersion(versionNum, old) {
    var temp = document.URL.substr(0, document.URL.search(old));
    window.open(temp + versionNum + "/overview", "_self");
}

function switchPage(newPage, oldPage) {
    var temp = document.URL.substr(0, document.URL.search(oldPage));
    window.open(temp + newPage, "_self");
}

function listChange(elementName, imgName) {

	var srcDash = document.getElementById(imgName).src;

	if (document.getElementById(imgName).src.includes("list_close.png")) {

		var srcF = srcDash.replace("list_close.png", "list_open.png");
        document.getElementById(imgName).src = srcF;
        document.getElementById(elementName).style.display = "block";

    } else {

		var srcF = srcDash.replace("list_open.png", "list_close.png");
        document.getElementById(imgName).src = srcF;
        document.getElementById(elementName).style.display = "none";

    }

}

function ColorLuminance(hex, lum) {

    hex = String(hex).replace(/[^0-9a-f]/gi, '');

    if (hex.length < 6) {

        hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];

    }

    lum = lum || 0;

    var rgb = "#", c, i;

    for (i = 0; i < 3; i++) {

        c = parseInt(hex.substr(i*2,2), 16);
        c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
        rgb += ("00"+c).substr(c.length);

    }

    return rgb;

}

function blendColors(c0, c1, p) {

    var f = parseInt(c0.slice(1),16), t = parseInt(c1.slice(1),16), R1 = f>>16, G1 = f>>8&0x00FF, B1 = f&0x0000FF, R2 = t>>16, G2 = t>>8&0x00FF, B2 = t&0x0000FF;

    return "#"+(0x1000000+(Math.round((R2-R1)*p)+R1)*0x10000+(Math.round((G2-G1)*p)+G1)*0x100+(Math.round((B2-B1)*p)+B1)).toString(16).slice(1);

}

function getCssValuePrefix() {
    var rtrnVal = '';
    var prefixes = ['-o-', '-ms-', '-moz-', '-webkit-'];

    var dom = document.createElement('div');

    for (var i = 0; i < prefixes.length; i++) {

        dom.style.background = prefixes[i] + 'liner-gradient(#000000, #ffffff)';

        if (dom.style.background) {
            rtrnVal = prefixes[i];
        }
    }

    dom = null;
    delete dom;

    return rtrnVal;
}

function coloredPie() {

    var plzPizza = document.querySelectorAll('path');

    plzPizza[12].style.fill = document.getElementById('piec1').value;
    plzPizza[13].style.fill = document.getElementById('piec2').value;
    plzPizza[14].style.fill = document.getElementById('piec3').value;
    plzPizza[15].style.fill = document.getElementById('piec4').value;
    plzPizza[16].style.fill = document.getElementById('piec5').value;

}

function pieCycle() {

    // first 7 path are on the ignore base
    // pie
    var plzPizza = document.querySelectorAll('path');
    //for (i = (((plzPizza.length - 7) / 2) + 6); i < plzPizza.length; i++) {
        //alert((1 / (i - (((plzPizza.length - 7) / 2) + 5))));
        //plzPizza[i].style.fill = ColorLuminance(mainColor, (1 / (i - (((plzPizza.length - 7) / 2) + 5))));
    //}
    var mainColor = generateColor();
    var i = (((plzPizza.length - 7) / 2) + 7);
    var mid = plzPizza.length - i;
    var top = mid;
    //plzPizza[i].style.fill = ColorLuminance(mainColor, (1 / (i - (((plzPizza.length - 7) / 2) + 5))));
    while (i < plzPizza.length) {

        //if (mid > (top / 2)) {
        //    plzPizza[i].style.fill = ColorLuminance(mainColor, (1 / (i - (((plzPizza.length - 7) / 2) + 5))));
        //} else {
        //    plzPizza[i].style.fill = ColorLuminance(mainColor, (-1 / (i - (((plzPizza.length - 7) / 2) + 5))));
        //}
        if (Math.random > 0.5) {
            plzPizza[i].style.fill = ColorLuminance(mainColor, Math.random());
        } else {
            plzPizza[i].style.fill = ColorLuminance(mainColor, -Math.random());
        }
        i++;
        mid--;

    }
    /**plzPizza[12].style.fill = generateColor();
    plzPizza[13].style.fill = generateColor();
    plzPizza[14].style.fill = generateColor();
    plzPizza[15].style.fill = generateColor();
    plzPizza[16].style.fill = generateColor();

    var mainColor = generateColor();

    plzPizza[12].style.fill = ColorLuminance(mainColor, 0.6);
    plzPizza[13].style.fill = ColorLuminance(mainColor, 0.3);
    plzPizza[14].style.fill = mainColor;
    plzPizza[15].style.fill = ColorLuminance(mainColor, -0.3);
    plzPizza[16].style.fill = ColorLuminance(mainColor, -0.6);**/

}

function colorTest() {

    var header = document.querySelectorAll('.app-bar');
    
    if (document.getElementById('input2').value == "#55A5CA") {
        header[0].style.backgroundColor = "#55A5CA";
        document.getElementById('test1').style.backgroundColor = "#55A5CA";
        document.getElementById('test2').style.backgroundColor = "#FFFFFF";
        document.getElementById('tester').style.backgroundImage = getCssValuePrefix() + 'linear-gradient(#55A5CA, #FFFFFF)';
        document.getElementById('input2').style.backgroundColor = document.getElementById('input2').value;
    } else if (document.getElementById('input2').value == "#D3491E") {
        header[0].style.backgroundColor = "#D3491E";
        document.getElementById('test1').style.backgroundColor = "#D3491E";
        document.getElementById('test2').style.backgroundColor = "#EECB47";
        document.getElementById('tester').style.backgroundImage = getCssValuePrefix() + 'linear-gradient(#D3491E, #EECB47)';
        document.getElementById('input2').style.backgroundColor = document.getElementById('input2').value;
    } else if (document.getElementById('input2').value == "#0B2C64") {
        header[0].style.backgroundColor = "#1A3D79";
        document.getElementById('test1').style.backgroundColor = "#1A3D79";
        document.getElementById('test2').style.backgroundColor = "#021330";
        document.getElementById('tester').style.backgroundImage = getCssValuePrefix() + 'linear-gradient(#1A3D79, #021330)';
        document.getElementById('input2').style.backgroundColor = document.getElementById('input2').value;
    } else {
        header[0].style.backgroundColor = ColorLuminance(document.getElementById('input2').value, 0.3);
        document.getElementById('test1').style.backgroundColor = ColorLuminance(document.getElementById('input2').value, 0.3);
        document.getElementById('test2').style.backgroundColor = ColorLuminance(document.getElementById('input2').value, -0.3);
        document.getElementById('tester').style.backgroundImage = getCssValuePrefix() + 'linear-gradient(' + ColorLuminance(document.getElementById('input2').value, 0.3) + ', ' + ColorLuminance(document.getElementById('input2').value, -0.3) + ')';
        document.getElementById('input2').style.backgroundColor = document.getElementById('input2').value;
    }

}

function colorTest2() {

    document.getElementById('test1').style.backgroundColor = ColorLuminance(document.getElementById('ncolor').value, document.getElementById('light').value);
    document.getElementById('test2').style.backgroundColor = ColorLuminance(document.getElementById('ncolor').value, document.getElementById('dark').value);
    document.getElementById('tester').style.backgroundImage = getCssValuePrefix() + 'linear-gradient(' + ColorLuminance(document.getElementById('ncolor').value, document.getElementById('light').value) + ', ' + ColorLuminance(document.getElementById('ncolor').value, document.getElementById('dark').value) + ')';

}

function colorTest3() {

    document.getElementById('test1').style.backgroundColor = document.getElementById('cone').value;
    document.getElementById('test2').style.backgroundColor = document.getElementById('ctwo').value;
    document.getElementById('tester').style.backgroundImage = getCssValuePrefix() + 'linear-gradient(' + document.getElementById('cone').value + ', ' + document.getElementById('ctwo').value + ')';

}

function showhide(show) {

    document.getElementById('ali1').style.display = "none";
    document.getElementById('ali2').style.display = "none";
    document.getElementById('ali3').style.display = "none";
    document.getElementById(show).style.display = "block";

}

function generateColor() {

    var color = "#";

    for (i = 0; i < 6; i++) {
        var tempL = Math.random() * 100;
        if (tempL <= 6.25) {
            color = color + "0";
        } else if (tempL <= 12.5) {
            color = color + "1";
        } else if (tempL <= 18.75) {
            color = color + "2";
        } else if (tempL <= 25) {
            color = color + "3";
        } else if (tempL <= 31.25) {
            color = color + "4";
        } else if (tempL <= 37.5) {
            color = color + "5";
        } else if (tempL <= 43.75) {
            color = color + "6";
        } else if (tempL <= 50) {
            color = color + "7";
        } else if (tempL <= 56.25) {
            color = color + "8";
        } else if (tempL <= 62.5) {
            color = color + "9";
        } else if (tempL <= 68.75) {
            color = color + "A";
        } else if (tempL <= 75) {
            color = color + "B";
        } else if (tempL <= 81.25) {
            color = color + "C";
        } else if (tempL <= 87.5) {
            color = color + "D";
        } else if (tempL <= 93.75) {
            color = color + "E";
        } else if (tempL <= 100) {
            color = color + "F";
        }
    }

    return color;

}

function generateColorList(length) {



}

function generateRandomColorList(length) {

    var tempL = "[";

    tempL = tempL + "]";
    alert(tempL);
    return tempL;

}

function forcerender() {

    var mainColor = generateColor();
    var amount = 0;
    var max = 11;
    while (amount < max) {
        if (amount < Math.ceil(max / 2)) {
            document.getElementById('color' + (amount + 1)).style.backgroundColor = ColorLuminance(mainColor, (1 / (amount + 1)));
            document.getElementById('center' + (amount + 1)).innerHTML = ColorLuminance(mainColor, (1 / (amount + 1)));
        } else if (amount == Math.ceil(max / 2)) {
            document.getElementById('color' + (amount + 1)).style.backgroundColor = ColorLuminance(mainColor, 0);
            document.getElementById('center' + (amount + 1)).innerHTML = ColorLuminance(mainColor, 0);
        } else {
            document.getElementById('color' + ((max + 1) - (amount - Math.ceil(max / 2)))).style.backgroundColor = ColorLuminance(mainColor, (-1 / ((amount - Math.ceil(max / 2)) + 1)));
            document.getElementById('center' + ((max + 1) - (amount - Math.ceil(max / 2)))).innerHTML = ColorLuminance(mainColor, (-1 / ((amount - Math.ceil(max / 2)) + 1)));
        }
        amount++;
    }

}

function blendForce() {

}







