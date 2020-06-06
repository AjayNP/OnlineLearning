
$(function () {
    $(document).on('copy paste cut contextmenu drag drop dragstart', function (e) {
        e.preventDefault();
        //return false;
    });

    $('input:text').attr("autocomplete", "off");
    try {
        if ($('.collapsed')[0] != null) {
            $('.collapsed')[0].click();
        }

        //$('.wysiwyg-toolbar-icon').click(function () {
        //    if (!jQuery(this).hasClass('highligh')) {
        //        jQuery(this).addClass('highligh');
        //    }
        //    else {
        //        jQuery(this).removeClass('highligh');
        //    }
        //});
    } catch (e) {

    }


});

function addLoadEvent(func) {

    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    }
    else {
        window.onload = function () {
            if (oldonload) {
                oldonload();
            }
            func();
        }
    }
}

/* ****************start Convert SHA1 Has code ************************/

var hex_chr = "0123456789abcdef";
function hex(num) {
    var str = "";
    for (var j = 7; j >= 0; j--)
        str += hex_chr.charAt((num >> (j * 4)) & 0x0F);
    return str;
}

/*
 * Convert a string to a sequence of 16-word blocks, stored as an array.
 * Append padding bits and the length, as described in the SHA1 standard.
 */
function str2blks_SHA1(str) {
    var nblk = ((str.length + 8) >> 6) + 1;
    var blks = new Array(nblk * 16);
    for (var i = 0; i < nblk * 16; i++) blks[i] = 0;
    for (i = 0; i < str.length; i++)
        blks[i >> 2] |= str.charCodeAt(i) << (24 - (i % 4) * 8);
    blks[i >> 2] |= 0x80 << (24 - (i % 4) * 8);
    blks[nblk * 16 - 1] = str.length * 8;
    return blks;
}

/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally 
 * to work around bugs in some JS interpreters.
 */
function add(x, y) {
    var lsw = (x & 0xFFFF) + (y & 0xFFFF);
    var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return (msw << 16) | (lsw & 0xFFFF);
}

/*
 * Bitwise rotate a 32-bit number to the left
 */
function rol(num, cnt) {
    return (num << cnt) | (num >>> (32 - cnt));
}

/*
 * Perform the appropriate triplet combination function for the current
 * iteration
 */
function ft(t, b, c, d) {
    if (t < 20) return (b & c) | ((~b) & d);
    if (t < 40) return b ^ c ^ d;
    if (t < 60) return (b & c) | (b & d) | (c & d);
    return b ^ c ^ d;
}

/*
 * Determine the appropriate additive constant for the current iteration
 */
function kt(t) {
    return (t < 20) ? 1518500249 : (t < 40) ? 1859775393 :
           (t < 60) ? -1894007588 : -899497514;
}

/*
 * Take a string and return the hex representation of its SHA-1.
 */

function calcSHA1(str) {
    var x = str2blks_SHA1(str);
    var w = new Array(80);

    var a = 1732584193;
    var b = -271733879;
    var c = -1732584194;
    var d = 271733878;
    var e = -1009589776;

    for (var i = 0; i < x.length; i += 16) {
        var olda = a;
        var oldb = b;
        var oldc = c;
        var oldd = d;
        var olde = e;

        for (var j = 0; j < 80; j++) {
            if (j < 16) w[j] = x[i + j];
            else w[j] = rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1);
            t = add(add(rol(a, 5), ft(j, b, c, d)), add(add(e, w[j]), kt(j)));
            e = d;
            d = c;
            c = rol(b, 30);
            b = a;
            a = t;
        }

        a = add(a, olda);
        b = add(b, oldb);
        c = add(c, oldc);
        d = add(d, oldd);
        e = add(e, olde);
    }
    return hex(a) + hex(b) + hex(c) + hex(d) + hex(e);
}

/* ****************End Convert SHA1 Has code ************************/
/*
 * Take a string and return the hex representation of its SHA-1.
 */

function calAES(str) {  // same as SHA1 only name changes for Login
    var x = str2blks_SHA1(str);
    var w = new Array(80);

    var a = 1732584193;
    var b = -271733879;
    var c = -1732584194;
    var d = 271733878;
    var e = -1009589776;

    for (var i = 0; i < x.length; i += 16) {
        var olda = a;
        var oldb = b;
        var oldc = c;
        var oldd = d;
        var olde = e;

        for (var j = 0; j < 80; j++) {
            if (j < 16) w[j] = x[i + j];
            else w[j] = rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1);
            t = add(add(rol(a, 5), ft(j, b, c, d)), add(add(e, w[j]), kt(j)));
            e = d;
            d = c;
            c = rol(b, 30);
            b = a;
            a = t;
        }

        a = add(a, olda);
        b = add(b, oldb);
        c = add(c, oldc);
        d = add(d, oldd);
        e = add(e, olde);
    }
    return hex(a) + hex(b) + hex(c) + hex(d) + hex(e);
}

/* ****************End Convert SHA1 Has code ************************/

Number.prototype.padLeft = function (base, chr) {
    var len = (String(base || 10).length - String(this).length) + 1;
    return len > 0 ? new Array(len).join(chr || '0') + this : this;
}

//*********************Customize Alert & Prgress bar ******************
var Timerid;
function fAlert(msg) {
    $("#dullscreen").hide();
    try {
        if ($("#sp-error") != null) {
            var ms = $("#sp-error").html();
            if (ms.trim() != "" && ms != undefined) {
                return false;
            }
        }
    } catch (e) {
    }
    clearTimeout(Timerid);
    $("#dvProgressbar").show();
    //$("#dvProgressbar").attr("style", "display:;");
    $("#dvMsg").html(msg);
    //Timerid = window.setInterval(fAutohidealert, 3000);
    Timerid = setTimeout(fAutohidealert, 3000);
}
function fAutohidealert() {
    $("#dullscreen").hide();
    if ($('#dvProgressbar').is(':hover') == false) {
        fhidealert();
    }
}
function fhidealert() {
    $("#dullscreen").hide();
    $("#dvMsg").html("<div class='C'>C <span class='load'>P l e a s e &nbsp;&nbsp; W a i t &nbsp;&nbsp;. . .</span></div><div id='loader' class='left-to-right'></div>");
    $("#dvProgressbar").hide();
    //if ($("#dvProgressbar").attr("style") == "display:;" || $("#dvProgressbar").attr("style")=="") {
    //    $("#dvMsg").html("<img src='../images/loading.gif' />");
    //    $("#dvProgressbar").attr("style", "display:none;");
    //}
}
function fSpin() {
    //return '<div style="text-align:center;"><i class="fa fa-cog fa-spin" style="font-size: 38px; color: #FB9337; font-weight: bolder; margin-top: 100px"></i><br /><span style="font-size: 15px; color: #FB9337; font-weight: bolder;">Loading .....</span></div>';
    return "<div class='C' style='color:orange;'>C</div><div id='loader' class='left-to-right' ></div>";
}
function fEnableProgress() {
    clearTimeout(Timerid);
    $("#dullscreen").show();
    $("#dvProgressbar").show();
    $("#dvMsg").html("<div class='C'>C <span class='load'>P l e a s e &nbsp;&nbsp; W a i t &nbsp;&nbsp;. . .</span></div><div id='loader' class='left-to-right'></div>");
}
//*********************End Customize Alert & Prgress bar ******************

//***************Start onkeyup remove error message***************

function keyup_removeclass(e, idname) {
    if (idname == 'undefined' || idname == null || idname == "") {
        idname = "sp-error";
    }
    if (window.event)
        varKey = window.event.keyCode;
    else
        varKey = e.which;
    if (varKey == 9 || varKey == 13) return false;
    var id = e.target.id;
    var value = document.getElementById(id).value;
    if (value != "" || value != "0") {
        document.getElementById(idname).innerHTML = "";
        $("#" + id + "").parent().removeClass("has-error");
        //$("#" + id + "").parent().addClass("has-success");
    }
}

//***************end onkeyup remove error message***************



//************** Start AutoComplete***************
function jsonAutoComplete(table, e) {
    var id = e.target.id;
    param = encodeURIComponent(document.getElementById(id).value);

    var Tempurl = '/AutoComplete/GetCompletionList?term=' + param + '&table=' + table + '';
    //$('#ui-id-1').html("");
    //this.element.find(".ui-menu").not(t.parents(".ui-menu")).clearQueue();
    if (param.length > 1) {
        $.post(Tempurl, function (data) {


            $("#" + id + "").autocomplete({

                cashe: false,
                source: $.map(data, function (item) {
                    return {
                        label: item.DDLName,
                        valid: item.DDLID
                    };
                }),
                select: function (event, ui) {
                    debugger;
                    $("#" + id + "").val(ui.item.label);
                    $("#hid" + id + "").val(ui.item.valid);
                    if (typeof ModuleSearchResponse == "function") {
                        ModuleSearchResponse(e);
                    }
                    if (typeof fSelectSearchResponse == "function") {
                        fSelectSearchResponse(e);
                    }


                    //this.element.find(".ui-menu").not(t.parents(".ui-menu")).clearQueue();
                    $('#ui-id-1').html("");
                }
            });
        }, 'json');
    }
    else {
        $('#ui-id-1').html("");
    }
}

//************ End AutoComplete*****************

//**************Check Image Exists****************
function imageExists(image_url) {
    var http = new XMLHttpRequest();
    http.open('HEAD', image_url, false);
    http.send();
    return http.status != 404;
}
//************ Xml Post *****************
function xmlPost(obj, Urlpath) {
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("load", function (evt) { Complete(evt); }, false);
    xhr.addEventListener("error", function (evt) { Failed(evt); }, false);
    xhr.addEventListener("abort", function (evt) { Canceled(evt); }, false);
    xhr.open("POST", Urlpath, true);
    xhr.send(obj);

}
function Failed(evt) {
    ////debugger;
    alert("There was an error in Controller");
}
function Canceled(evt) {
    ////debugger;
    alert("Your Process is terminated by the user or the browser dropped the connection.");
}

//*************ImageAssignToControl********************//
function ShowingImagePreview(input, name) {
    var fileExtension = ['jpeg', 'jpg', 'JPG', 'JPEG'];
    var extn = input.files[0].name.split('.')
    if ($.inArray(extn[1], fileExtension) == -1) {
        document.getElementById(input.id).value = '';
        fAlert("You can upload a JPG format only.");
        return false;
    }

    if (input.files[0].size > 20000) {
        document.getElementById(input.id).value = '';
        fAlert("Maximum size of 20 kb")
        return false;
    }

    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $(name).prop('src', e.target.result);
            document.getElementById('rmv' + name).style.display = '';
        }
        reader.readAsDataURL(input.files[0]);
    }
}

//***********EndImageAssignControl******************//
function jsonPostdata(param, e) {
    var url = '/' + param[0] + '/' + param[1] + '';
    var Tempmodel = param[2];
    if (e != null)
        var id = e.target.id;
    $.post(url, Tempmodel, function (data) {

        debugger
        if (data.Message != "") {
            if (data.Message == "Login Again") {
                location.href = '/';
            }
            else {
                if (data.Message == "Save Successfully" || data.Message == "Saved Successfully" || data.Message == "S") {
                    fAlert("Saved Successfully");
                    filllist(data.Data);
                }
                else if (data.Message == "Updated Successfully" || data.Message == "U") {
                    fAlert(data.Message);
                    filllist(data.Data);
                }
                else {
                    fAlert(data.Message);
                }
                if (e != null && e.target.type == "submit")
                    $("#" + id + "").attr('disabled', false);
            }
        }
    }, 'json');
}

function jsongetdata(param) {
    var url = '/' + param[0] + '/' + param[1] + '';
    var Tempmodel = param[2];

    $.post(url, Tempmodel, function (data) {
        debugger;
        if (data.Message != "") {
            if (data.Message == "Login Again") {
                location.href = '/';
            }
            else {
                //alert(data.Message);
                fAlert(data.Message);
                if (typeof fClearPageData == "function") {
                    fClearPageData();
                }
            }
        }
        else {
            fillgetdata(data.Data);
        }
    }, 'json');
}

function fClose(data) {
    if (data != null && data != "" && data[2] != "mnuCCompany" && data[2] != "mnuFASetCompanyLocation") {
        location.href = data[4] + "?parentid=" + data[0] + "&menuid=" + data[1] + "";
    }
    else {
        location.href = '/Campus/Default';
    }
}
///Convert json date format to date format/////////////

function convertjsonDate(value) {
    //  debugger;
    if (value != null && value.length > 10) {
        var datestring = value.substr(6);
        var aa = new Date(parseInt(datestring));
        //alert(new Date(parseInt(datestring)));
        //alert(new Date(aa.getTime() + (60000 * aa.getTimezoneOffset())+(3600000*5.5)));
        //alert(new Date(new Date(parseInt(datestring))));
        var current = new Date(aa.getTime() + (60000 * aa.getTimezoneOffset()) + (3600000 * 5.5));
        //var current = new Date(new Date(parseInt(datestring)).toLocaleString("en-US", { timeZone: 'Asia/Kolkata' }));
        var month = ((current.getMonth() + 1).toString().length == 1) ? "0" + (current.getMonth() + 1).toString() : (current.getMonth() + 1).toString();
        var day = (current.getDate().toString().length == 1) ? "0" + current.getDate().toString() : current.getDate().toString();
        var year = current.getFullYear();
        var date = day + "/" + month + "/" + year;
        return date;

    }
    else
        return "";
}

///Convert json date format to date format/////////////


///////////////// Start For Allowing Numeric Value //////////////////////////
function fAllowNumeric(e) {

    if (window.event)
        varKey = window.event.keyCode;
    else
        varKey = e.which;
    if (varKey >= 48 && varKey <= 57 || varKey == 8 || varKey == 127 || varKey == 0)
        return true;
    else
        return false;
}

///////////////// End For Allowing Numeric Value //////////////////////////


///////////////// Start For Checking Valid Date //////////////////////////
function validateDate(fld) {
    var dd, mm, yy;
    var today = new Date;
    var t = new Date;
    fld = stripBlanks(fld);
    if (fld == '') return false;
    if (fld.length < 10) return false;
    var d1 = fld.split('/');
    if (d1.length != 3) d1 = fld.split('-');
    if (d1.length != 3) d1 = fld.split('.');
    if (d1.length != 3) return false;
    dd = d1[0]; mm = d1[1]; yy = d1[2];
    if (!isNum(dd)) return false;
    if (!isNum(yy)) return false;
    if (!isNum(mm)) return false;
    if (dd.length > 2) return false;
    if (mm.length > 2) return false;
    if (yy.length > 4) return false;
    dd = parseFloat(dd);
    mm = parseFloat(mm);
    yy = parseFloat(yy);
    //if (yy < 100) yy += 2000;
    if (yy < 1753 || yy > 2099) return false;
    if (mm == 2 && (yy % 400 == 0 || (yy % 4 == 0 && yy % 100 != 0))) day[mm - 1]++;
    if (mm < 1 || mm > 12) return false;
    if (dd < 1 || dd > day[mm - 1]) return false;
    t.setDate(dd); t.setMonth(mm - 1); t.setFullYear(yy);
    //if (t > today) return false;
    return true;
}

///////////////// End For Checking Valid Date //////////////////////////

function stripBlanks(fld) {
    ////debugger;
    var result = "";
    var c = 0;
    var prevChar = " ";
    for (i = 0; i < fld.length; i++) {

        if (fld.charAt(i) != " " || c > 0) {
            if (prevChar != fld.charAt(i) || prevChar != " ") {
                result += fld.charAt(i);
                prevChar = fld.charAt(i);
                if (fld.charAt(i) != " ") c = result.length;
            }
        }
    }
    return result.substr(0, c);
}


var numb = '0123456789';
function isValid(parm, val) {
    if (parm == "") return false;
    for (i = 0; i < parm.length; i++) {
        if (val.indexOf(parm.charAt(i), 0) == -1)
            return false;
    }
    return true;
}
function isNum(parm) { return isValid(parm, numb); }


var mth = new Array(' ', 'january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december');
var day = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);



function validateEmail(Email) {
    var checkmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!checkmail.test(Email))
        return false;
    else
        return true;

}
function Restrict_Name(e) {
    var varKey;
    if (window.event)
        varKey = window.event.keyCode;
    else
        varKey = e.which;
    if (varKey >= 65 && varKey <= 90 || varKey >= 97 && varKey <= 122 || varKey == 95 || varKey == 46 || varKey >= 38 && varKey <= 44 || varKey >= 45 && varKey <= 57 || varKey == 127 || varKey == 8 || varKey == 32 || varKey == 0)
        return true;
    else
        return false;
}

function Restrict_Phone(e) {

    var varKey;
    if (window.event)
        varKey = window.event.keyCode;
    else
        varKey = e.which;
    if (varKey == 44 || varKey >= 48 && varKey <= 57 || varKey == 8 || varKey == 127 || varKey == 0)
        return true;
    else
        return false;
}

function Restrict_Address(e) {
    var varKey;
    if (window.event)
        varKey = window.event.keyCode;
    else
        varKey = e.which;
    if (varKey >= 64 && varKey <= 90 || varKey >= 97 && varKey <= 122 || varKey == 95 || varKey == 46 || varKey >= 38
        && varKey <= 43 || varKey >= 44 && varKey <= 57 || varKey == 127 || varKey == 8 || varKey == 32 || varKey == 0 || varKey == 35 || varKey == 92)

        return true;
    else
        return false;
}
function Restrict_Pincode(e) {
    var varKey;
    if (window.event)
        varKey = window.event.keyCode;
    else
        varKey = e.which;
    if (varKey >= 48 && varKey <= 57 || varKey == 127 || varKey == 8 || varKey == 0)
        return true;
    else
        return false;
}


function Restrict_Multiline(e, intMax) {
    var varKey;
    var event = e || window.event;
    var target = event.target || event.srcElement
    if (window.event)
        varKey = window.event.keyCode;
    else
        varKey = e.which;

    if (varKey == 8 || varKey == 0)
        return true;

    if (varKey >= 64 && varKey <= 90 || varKey >= 97 && varKey <= 122 || varKey == 95 || varKey == 46 || varKey >= 38
    && varKey <= 43 || varKey >= 44 && varKey <= 57 || varKey == 127 || varKey == 8 || varKey == 32 || varKey == 0 || varKey == 35 || varKey == 92) {
        if (document.getElementById(target.id).value.length < intMax)
            return true;
        else
            return false;
    }
    else
        return false;
}

function pLockControls(Parent) {
    ////debugger;
    //$("input").attr("disabled", "true");
    //$("#" + Parent + "").find("input").attr("disabled", "true");
    var varElements = document.getElementById(Parent).getElementsByTagName('INPUT');
    for (var varForLoop = 0; varForLoop < varElements.length; varForLoop++) {
        if (varElements[varForLoop].type.toLowerCase() == 'text' || varElements[varForLoop].type.toLowerCase() == 'textarea')
            varElements[varForLoop].readOnly = true;
        else if (varElements[varForLoop].type.toLowerCase() == 'radio' || varElements[varForLoop].type.toLowerCase() == 'checkbox')
            varElements[varForLoop].disabled = true;
    }
    var varElements = document.getElementById(Parent).getElementsByTagName('SELECT');
    for (var varForLoop = 0; varForLoop < varElements.length; varForLoop++) {
        if (varElements[varForLoop].id != 'lstCDisplay') varElements[varForLoop].disabled = true;
    }
    var varElements = document.getElementById(Parent).getElementsByTagName('textarea');
    for (var varForLoop = 0; varForLoop < varElements.length; varForLoop++) {
        varElements[varForLoop].readOnly = true;
    }
    var varElements = document.getElementById(Parent).getElementsByTagName('button');
    for (var varForLoop = 0; varForLoop < varElements.length; varForLoop++) {
        varElements[varForLoop].disabled = true;
    }
}
function pUnLockControls(Parent) {
    //$("input").removeAttr("disabled")
    var varElements = document.getElementById(Parent).getElementsByTagName('INPUT');
    for (var varForLoop = 0; varForLoop < varElements.length; varForLoop++) {
        if (varElements[varForLoop].type.toLowerCase() == 'text' || varElements[varForLoop].type.toLowerCase() == 'textarea')
            varElements[varForLoop].readOnly = false;
        else if (varElements[varForLoop].type.toLowerCase() == 'radio' || varElements[varForLoop].type.toLowerCase() == 'checkbox')
            varElements[varForLoop].disabled = false;
    }
    var varElements = document.getElementById(Parent).getElementsByTagName('SELECT');
    for (var varForLoop = 0; varForLoop < varElements.length; varForLoop++) {
        varElements[varForLoop].disabled = false;
    }
    var varElements = document.getElementById(Parent).getElementsByTagName('textarea');
    for (var varForLoop = 0; varForLoop < varElements.length; varForLoop++) {
        varElements[varForLoop].readOnly = false;
    }
    var varElements = document.getElementById(Parent).getElementsByTagName('button');
    for (var varForLoop = 0; varForLoop < varElements.length; varForLoop++) {
        varElements[varForLoop].disabled = false;
    }
}

function pClearFields(Parent, ids) {
    ////debugger;
    try {
        var varElements = document.getElementById(Parent).getElementsByTagName('INPUT');
        for (var varForLoop = 0; varForLoop < varElements.length; varForLoop++) {
            if (ids == null || ids.indexOf(varElements[varForLoop].id) < 0 || ids == 'undefined') {
                if (varElements[varForLoop].type.toLowerCase() == 'text' || varElements[varForLoop].type.toLowerCase() == 'textarea' || varElements[varForLoop].type.toLowerCase() == 'hidden') varElements[varForLoop].value = '';
                else if (varElements[varForLoop].type.toLowerCase() == 'checkbox') varElements[varForLoop].checked = false;
            }
        }
        var varElements = document.getElementById(Parent).getElementsByTagName('SELECT');
        for (var varForLoop = 0; varForLoop < varElements.length; varForLoop++) {
            varElements[varForLoop].selectedIndex = 0;
        }
        var varElements = document.getElementById(Parent).getElementsByTagName('textarea');
        for (var varForLoop = 0; varForLoop < varElements.length; varForLoop++) {
            varElements[varForLoop].value = '';
        }
    } catch (e) {
        fAlert(e.message);
    }

}

function Restrict_Money(e) {

    var varKey;
    if (window.event)
        varKey = window.event.keyCode;
    else
        varKey = e.which;
    if ((varKey >= 48 && varKey <= 57) || varKey == 127 || varKey == 46 || varKey == 8 || varKey == 0)
        return true;
    else
        return false;


}

function ConvertDateToYYYYMMDD(Date1) {
    if (Date1.length < 10) return "";
    Date1 = stripBlanks(Date1);
    var Date2 = "";
    var d1 = Date1.split('/');
    if (d1.length != 3) d1 = Date1.split('-');
    if (d1.length != 3) d1 = Date1.split('.');
    Date2 = d1[2] + '/' + d1[1] + '/' + d1[0];
    return Date2;
}

function fAllowMoneywithdot(e) {
    // //debugger;
    var varKey;
    if (window.event)
        varKey = window.event.keyCode;
    else
        varKey = e.which;
    var event = e || window.event;
    var target = event.target || event.srcElement;
    //if (inStr(target.value, '.') && (varKey == 46)) return false;
    var strArray = target.value.split('.');
    //if (strArray[1] == '' && varKey == 46)
    if (strArray.length > 1 && varKey == 46)
        return false;
    //if (varKey == 46 || (varKey >= 48 && varKey <= 57) || varKey == 8 || varKey == 127)

    if ((varKey >= 48 && varKey <= 57) || varKey == 127 || varKey == 46 || varKey == 8 || varKey == 0)
        return true;
    else
        return false;



}
function fNumber(varAction, e) {
    //
    var varKey;
    if (window.event)
        varKey = window.event.keyCode;
    else
        varKey = e.which;
    var target = event.target || event.srcElement;
    if (varKey == 44) {
        if (stripBlanks(target.value).length < 10) {
            alert("Please Enter 10 digit Mobile No");
            return false;
        }
        var Arr = stripBlanks(target.value).split(',');
        for (var inti = 0; inti < Arr.length; inti++) {
            if ((Arr[inti].length) < 10 || Arr[inti].length > 10) {
                alert("Please Enter 10 digit Mobile No");
                return false;
            }
        }
    }
    else {
        if (varKey >= 48 && varKey <= 57 || varKey == 32 || varKey == 127 || varKey >= 40 && varKey <= 41 || varKey == 8 || varKey == 0) {
            return true;
        }
        else {
            return false;
        }
    }
}
function RestrictEnterDate(e) {
    var varKey;
    var event = e || window.event;
    if (window.event)
        varKey = window.event.keyCode;
    else
        varKey = e.which;
    var target = event.target || event.srcElement;

    if ((target.value.length == 2 || target.value.length == 5)) target.value = target.value + '/';
    if (varKey == 47 || varKey == 45 || varKey == 46) return false;
    return Restrict_Date(e);

}
function Restrict_Date(e) {
    var varKey;
    if (window.event)
        varKey = window.event.keyCode;
    else
        varKey = e.which;
    if (varKey >= 45 && varKey <= 57 || varKey == 127 || varKey == 8 || varKey == 0)
        return true;
    else
        return false;
}
function Restrict_MoneyWithPercentage(e) {
    var varKey;
    if (window.event)
        varKey = window.event.keyCode;
    else
        varKey = e.which;
    var event = e || window.event;
    var target = event.target || event.srcElement;
    var strArray = target.value.split('.');
    if (strArray.length > 1 && varKey == 46)
        return false;
    var strArray = target.value.split('%');
    if (strArray.length > 1 && varKey == 37)
        return false;
    //if ((target.value== '.') && (varKey == 46)) return false;
    //if ((target.value== '%') && (varKey == 37)) return false;
    if (varKey == 46 || varKey == 37 || (varKey >= 48 && varKey <= 57) || varKey == 8 || varKey == 127)
        return true;
    else
        return false;

}

//to restrict  on enter in chrome drop down is getting opened Start
function RestrictforChrome(e) {
    var varKey;
    if (window.event)
        varKey = window.event.keyCode;
    else
        varKey = e.which;

    if (varKey == 13) {
        return false;
    }
}

// to restrict  on enter in chrome drop down is getting opened End





function GetScreenPosition(obj) {
    var p = {};
    p.x = obj.offsetLeft;
    p.y = obj.offsetTop + obj.offsetHeight;
    while (obj.offsetParent) {
        p.x = p.x + obj.offsetParent.offsetLeft;
        p.y = p.y + obj.offsetParent.offsetTop;
        if (obj == document.getElementsByTagName("body")[0]) {
            break;
        }
        else {
            obj = obj.offsetParent;
        }
    }
    return p;
}

function fClearDisplayMessage() {
    $("#sp-error").parent().removeClass("has-error");
    document.getElementById('sp-error').innerHTML = "";
}

function ImgUpload(varImg) {
    $("#" + varImg + "").clearQueue();
    document.getElementById(varImg).click();
}



function fDisplayMessage(id, msg, type) {
    ////debugger;
    if (type == null || type == 0) {
        document.getElementById('sp-error').innerHTML = msg;
        $("#" + id).parent().addClass("has-error");
        document.getElementById(id).focus();
        //$('#' + id).attr(onkeyup, "return keyup_removeclass(event)");
    }
    else {
        document.getElementById('sp-error').innerHTML = msg;
        $("#" + id.replace("ID", "Name")).parent().addClass("has-error");
        document.getElementById("btn" + id).focus();
    }
}


function fFillSection(e) {
    ////debugger;
    if (document.getElementById('CLID').value == "0" || stripBlanks(document.getElementById('CLID').value) == "") {
        fAlert("Please Select Class");
        document.getElementById('CLID').focus();
        return false;
    }
    else {
        document.getElementById('TSectionIDs').href = "/Campus/DDLPopUp?strid=TSectionID^" + document.getElementById('CLID').value;
        document.getElementById('TSectionIDs').click();
    }
    return false;
}


function fAllowNumericMinus(e) {

    if (window.event)
        varKey = window.event.keyCode;
    else
        varKey = e.which;
    if ((varKey >= 48 && varKey <= 57) || varKey == 8 || varKey == 127 || varKey == 0)
        return true;
    else {
        if (varKey == 45) {
            var result = e.target.value;
            if (result.indexOf('-') < 0) {
                if (e.target.selectionStart == 0)
                    return true;
            }
            else {
                if (e.target.selectionStart != e.target.selectionEnd && e.target.selectionStart == 0)
                    return true;
            }
        }
        return false;
    }
}


function fFillCheckBoxList(colid, id) {
    var arr = GetCheckCollection(colid);
    if (arr.length > 0) {
        $.post('/Campus/GetCheckBoxList', { "strid": id, "ColID": arr }, function (data) {

            //debugger;
            if (data.Message != "") {
                if (data.Message == "Login Again") {
                    location.href = '/';
                }
                else {
                    alert(data.Message);
                }
            }
            else {
                var result = "";
                for (var i = 0; i < data.Data[0].length; i++) {
                    var row = '<label class="checkbox-inline" style="width:130px; margin-left:2px;">' +
                                '<input type="checkbox" name="chk_' + data.Data[0][i].CheckName + '" class="chk_' + id + '" oncontextmenu="return fSelectDeSelectMenu(event,\'chk_' + id + '\');" id="chk_' + id + '_' + data.Data[0][i].CheckID + '">' + data.Data[0][i].CheckName +
                                '</label>';
                    result = result + row;
                }
                $("#div_" + id).html(result);
            }
        }, 'json');
    }
    else {
        $("#div_" + id).html("");
    }
}

function GetCheckCollection(colid) {
    //debugger;
    var arr = [];
    for (var i = 0; i < $(".chk_" + colid).length; i++) {
        var item = $(".chk_" + colid)[i];
        if (item.checked == true) {
            arr.push(item.id.replace("chk_" + colid + "_", ""));
        }
    }
    return arr;
}

function GetCheckValue(colid) {
    //debugger;
    var arr = "";
    for (var i = 0; i < $(".chk_" + colid).length; i++) {
        var item = $(".chk_" + colid)[i];
        if (item.checked == true) {
            arr = arr + "," + item.id.replace("chk_" + colid + "_", "");
        }
    }
    if (arr.length > 0)
        arr = arr.substring(1, arr.length);
    return arr;
}

function GetCheckName(colid) {
    //debugger;
    var arr = "";
    for (var i = 0; i < $(".chk_" + colid).length; i++) {
        var item = $(".chk_" + colid)[i];
        if (item.checked == true) {
            arr = arr + " ," + item.name.replace("chk_", "");
        }
    }
    if (arr.length > 0)
        arr = arr.substring(1, arr.length);
    return arr;
}


function SpanGridViewRow(gvid, colid) {
    var rowid;
    var i;
    var col = colid.split(',');
    for (var j = 0; j < col.length; j++) {
        rowid = 1;
        for (i = 1; i < document.getElementById(gvid).rows.length - 1; i++) {
            if (GetCellDataForRowSpan(document.getElementById(gvid).rows[rowid], document.getElementById(gvid).rows[i + 1], Number(col[j]))) {
                document.getElementById(gvid).rows[rowid].cells[col[j]].rowSpan += 1;
                document.getElementById(gvid).rows[rowid].cells[col[j]].style = "vertical-align: middle;";
                document.getElementById(gvid).rows[i + 1].cells[col[j]].outerHTML = "";
            }
            else {
                rowid = i + 1;
            }
            //debugger;
            if (document.getElementById(gvid).rows[i].cells.length > Number(col[j]) && (document.getElementById(gvid).rows[i].cells[col[j]].innerHTML.toLowerCase() == "total" || document.getElementById(gvid).rows[i].cells[col[j]].innerHTML.toLowerCase() == "grand total")) {
                //debugger;
                $(document.getElementById(gvid).rows[i]).attr("style", "font-weight: bold;");
                //document.getElementById(gvid).rows[i].style = "font-weight: bold;";
            }
        }
        if ((document.getElementById(gvid).rows.length - 1) > 1 && document.getElementById(gvid).rows[i].cells.length > Number(col[j]) && (document.getElementById(gvid).rows[i].cells[col[j]].innerHTML.toLowerCase() == "total" || document.getElementById(gvid).rows[i].cells[col[j]].innerHTML.toLowerCase() == "grand total")) {
            //debugger;
            $(document.getElementById(gvid).rows[i]).attr("style", "font-weight: bold;");
            //document.getElementById(gvid).rows[i].style = "font-weight: bold;";
        }
    }
}


function SetCookieForReport() {
    //debugger;
    document.cookie = "";
    if (document.getElementById('divCheckBoxList') != null) {
        for (var inti = 0; inti < document.getElementById('divCheckBoxList').getElementsByTagName('div').length; inti++) {
            var id = document.getElementById('divCheckBoxList').getElementsByTagName('div')[inti].id;
            if (id.indexOf("div_") == 0) {
                var chkid = id.replace("div_", "");
                document.cookie = chkid + "=" + GetCheckValue(chkid) + ";path=/";
                document.cookie = chkid + "_Name" + "=" + GetCheckName(chkid) + ";path=/";
            }
        }
    }
    if (document.getElementsByClassName('divTextBox') != null) {
        for (var inti = 0; inti < $('.divTextBox').find("input").length; inti++) {
            var id = $('.divTextBox').find("input")[inti].id;
            if (id.indexOf("txt_") == 0) {
                var txtid = id.replace("txt_", "");
                document.cookie = txtid + "=" + document.getElementById(id).value + ";path=/";
            }
        }
        for (var inti = 0; inti < $('.divTextBox').find("input").length; inti++) {
            var id = $('.divTextBox').find("input")[inti].id;
            if (id.indexOf("ddl_") == 0) {
                var txtid = id.replace("ddl_", "");
                document.cookie = txtid + "=" + document.getElementById(id).value + ";path=/";
                document.cookie = txtid + "_Name" + "=" + document.getElementById(id).options[document.getElementById(id).selectedIndex].innerHTML + ";path=/";
            }
        }
    }
    if (document.getElementById('divDropDownList') != null) {
        for (var inti = 0; inti < document.getElementById('divDropDownList').getElementsByTagName('SELECT').length; inti++) {
            var id = document.getElementById('divDropDownList').getElementsByTagName('SELECT')[inti].id;
            if (id.indexOf("ddl_") == 0) {
                var txtid = id.replace("ddl_", "");
                document.cookie = txtid + "=" + document.getElementById(id).value + ";path=/";
                document.cookie = txtid + "_Name" + "=" + document.getElementById(id).options[document.getElementById(id).selectedIndex].innerHTML + ";path=/";
            }
        }
    }
}
function round_decimals(original_number, decimals) {
    var result1 = original_number * Math.pow(10, decimals)
    var result2 = Math.round(result1)
    var result3 = result2 / Math.pow(10, decimals)
    return pad_with_zeros(result3, decimals)
}

function pad_with_zeros(rounded_value, decimal_places) {

    // Convert the number to a string
    var value_string = rounded_value.toString()

    // Locate the decimal point
    var decimal_location = value_string.indexOf(".")

    // Is there a decimal point?
    if (decimal_location == -1) {

        // If no, then all decimal places will be padded with 0s
        decimal_part_length = 0

        // If decimal_places is greater than zero, tack on a decimal point
        value_string += decimal_places > 0 ? "." : ""
    }
    else {

        // If yes, then only the extra decimal places will be padded with 0s
        decimal_part_length = value_string.length - decimal_location - 1
    }

    // Calculate the number of decimal places that need to be padded with 0s
    var pad_total = decimal_places - decimal_part_length

    if (pad_total > 0) {

        // Pad the string with 0s
        for (var counter = 1; counter <= pad_total; counter++)
            value_string += "0"
    }
    return value_string
}

function GetCellDataForRowSpan(row1, row2, cell) {
    var data1 = "";
    var data2 = "";
    if (row1.cells.length > cell) {
        for (var i = cell; i >= 0; i--) {
            data1 += row1.cells[i].innerHTML + "^";
            data2 += row2.cells[i].innerHTML + "^";
        }
        if (data1 == data2) return true;
    }
    return false;
}

function getPosition(e) {
    e = e || window.event;
    var cursor = { x: 0, y: 0 };
    if (e.pageX || e.pageY) {
        cursor.x = e.pageX;
        cursor.y = e.pageY;
    }
    else {
        var de = document.documentElement;
        var b = document.body;
        cursor.x = e.clientX +
            (de.scrollLeft || b.scrollLeft) - (de.clientLeft || 0);
        cursor.y = e.clientY +
            (de.scrollTop || b.scrollTop) - (de.clientTop || 0);
    }
    return cursor;
}

// For Select DeSelect All
document.onclick = fInvisibleMenu;
var classname = "chk";
var StartPosition = 0;
//var fname = "";
function fSelectDeSelectMenu(e, cname, rowid) {
    //debugger;
    var SelectAllObj = new Object();
    SelectAllObj = document.getElementById('divSelectDeSelect');
    var xPosition = getPosition(e).x;
    var yPosition = getPosition(e).y;
    SelectAllObj.style.position = "absolute";
    SelectAllObj.style.top = String(yPosition) + "px";
    SelectAllObj.style.left = String(xPosition) + "px";
    SelectAllObj.style.display = "inline";
    if (cname != null)
        classname = cname;
    else
        classname = "chk";
    if (rowid != null)
        StartPosition = rowid;
    else
        StartPosition = 0;
    //if (e.target.onclick != null)
    //    fname = $("#" + e.target.id).attr("onclick");
    //else
    //    fname = "";
    return false;
}
function fInvisibleMenu() {
    if (document.getElementById('divSelectDeSelect') != null)
        document.getElementById('divSelectDeSelect').style.display = 'none';
}


function fSelectDeSelectAll(eType) {
    //debugger;
    if (eType == 1) {
        for (var i = StartPosition; i < $('.' + classname).length; i++) {
            if ($('.' + classname)[i].disabled == false)
                $('.' + classname)[i].checked = true;
        }
        //$('.' + classname).attr('checked', true);
    }
    else {
        for (var i = StartPosition; i < $('.' + classname).length; i++) {
            if ($('.' + classname)[i].disabled == false)
                $('.' + classname)[i].checked = false;
        }
        //$('.' + classname).attr('checked', false);
    }
    document.getElementById('divSelectDeSelect').style.display = 'none';
    if ($('.' + classname).length > 0 && $('.' + classname)[0].onclick != null) {
        eval($("#" + $('.' + classname)[0].id).attr("onclick"));
    }
    return false;
}
//End Select DeSelect All


//Start Apply All
var varCell;
var varRow;
var varContrlName;
var varType;

document.onclick = fInvisibleApply;

function fApplyToAllMenu(e, varSelRow, varLoop, gridName, Type) {
    var SelectAllObj = new Object();
    SelectAllObj = document.getElementById("divApplyToAll");
    var xPosition = getPosition(e).x;
    var yPosition = getPosition(e).y;
    SelectAllObj.style.position = "absolute";
    SelectAllObj.style.top = String(yPosition) + "px";
    SelectAllObj.style.left = String(xPosition) + "px";
    SelectAllObj.style.display = "inline";
    varCell = varLoop;
    varRow = varSelRow;
    varContrlName = gridName;
    varType = Type;
    return false;
}

function fApplyToAll() {
    if (typeof fApplyToAll_Child == "function") {
        fApplyToAll_Child();
    }
    else if (document.getElementById(varContrlName) != null) {
        if (document.getElementById(varContrlName).rows.length > 0)
            varRow = Number(varRow) + 1;
        for (var i = varRow; i < document.getElementById(varContrlName).rows.length - 1; i++) {
            if (varType == "INPUT") {
                document.getElementById(varContrlName).rows[i + 1].cells[varCell].getElementsByTagName('INPUT')[0].value = document.getElementById(varContrlName).rows[i].cells[varCell].getElementsByTagName('INPUT')[0].value;
            }
            else {
                document.getElementById(varContrlName).rows[i + 1].cells[varCell].getElementsByTagName('SELECT')[0].value = document.getElementById(varContrlName).rows[i].cells[varCell].getElementsByTagName('SELECT')[0].value;
            }
        }
    }
    document.getElementById('divApplyToAll').style.display = 'none';
    return false;
}

function fInvisibleApply() {
    if (document.getElementById('divApplyToAll') != null)
        document.getElementById('divApplyToAll').style.display = 'none';
}
//End Apply All


function CompareDate(Date1, Date2) {
    //returns 1 when Date1 is lesser
    //returns 2 when Date2 is lesser
    //returns 0 when Both dates are equal
    var dd1, mm1, yy1, dd2, mm2, yy2;
    Date1 = stripBlanks(Date1);
    Date2 = stripBlanks(Date2);

    var d1 = Date1.split('/');
    if (d1.length != 3) d1 = Date1.split('-');
    if (d1.length != 3) d1 = Date1.split('.');
    var d2 = Date2.split('/');
    if (d2.length != 3) d2 = Date2.split('-');
    if (d2.length != 3) d2 = Date2.split('.');

    dd1 = parseFloat(d1[0]);
    mm1 = parseFloat(d1[1]);
    yy1 = parseFloat(d1[2]);
    dd2 = parseFloat(d2[0]);
    mm2 = parseFloat(d2[1]);
    yy2 = parseFloat(d2[2]);

    if (yy1 < yy2) return 1;
    if (yy1 > yy2) return 2;
    if (mm1 < mm2) return 1;
    if (mm1 > mm2) return 2;
    if (dd1 < dd2) return 1;
    if (dd1 > dd2) return 2;
    return 0;
}


/////////////Start Read Cookies Value in JavaScript/////////////////
function readcookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}
function Setcookie(name, val, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + val + "; " + expires;
}

function DeleteCookie() {
    //for (var it in $.cookie()) $removeCookie(it);
    //debugger;
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        var entry = c.split("=");
        var name = entry[0];
        var d = new Date();
        d.setTime(d.getTime() + (-1 * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = name + "=;" + expires + ";path=/ ";
    }
}
/////////////End Read Cookies Value in JavaScript/////////////////

function getHTMLReportFilterVal() {

    var filtervalid = [];
    if (document.getElementById('divCheckBoxList') != null) {
        for (var inti = 0; inti < document.getElementById('divCheckBoxList').getElementsByTagName('div').length; inti++) {
            var id = document.getElementById('divCheckBoxList').getElementsByTagName('div')[inti].id;
            if (id.indexOf("div_") == 0) {
                var chkid = id.replace("div_", "");
                var lblid = id.replace("div_", "lbl_");
                var lblValue = document.getElementById(lblid).innerHTML;

                filtervalid.push(lblValue + "^" + GetCheckValue(chkid) + "#" + GetCheckName(chkid));

                // filtervalid.push(chkid.toString().replace("`", "") + "^" + GetCheckValue(chkid) + "#" + GetCheckName(chkid));
            }
        }
    }
    return filtervalid;
}



function fFeeLoad() {
    //debugger;
    if (document.getElementById("btnFIID") != null && document.getElementById("FGID") != null) {
        $("#FGID").on("change", function () {
            //debugger;
            document.getElementById("FIID").value = "";
            document.getElementById("FIName").value = "";
        });
        $("#btnFIID").on("click", function () {
            if (document.getElementById("btnFGID") != null && (document.getElementById("FGID").value == "" || document.getElementById("FGID").value == "0")) {
                fDisplayMessage("FGID", "Please select Fee Group First", 1);
                return false;
            }
            else if (document.getElementById("hidtxtSearchName") != null && (document.getElementById("hidtxtSearchName").value == "" || document.getElementById("hidtxtSearchName").value == "0")) {
                fDisplayMessage("FNo", "Please select Student First");
                return false;
            }
            else {
                //document.getElementById('btnFIID').href = "/Campus/DDLPopUp?strid=FGFIID^" + document.getElementById('FGID').value;
                $("#btnFIID").attr("href", "/Campus/DDLPopUp?strid=FGFIID^" + document.getElementById('FGID').value + "&ctrlid=FIID");
                //alert("/Campus/DDLPopUp?strid=FGFIID^" + document.getElementById('FGID').value);
                //document.getElementById('btnFIID').click();
                return true;
            }
        });

    }
}

function FilterDiv(e) {
    var xPosition = getPosition(e).x;
    var yPosition = getPosition(e).y;
    $("#ddlFilter").parent('').removeClass("has-error");
    $("#Search").parent('').removeClass("has-error");

    if ($('#FilterDiv').css('display') == 'none') {
        $('#FilterDiv').css({
            'width': '170px',
            'border': '2px solid #ff8c00',
            'padding': '10px',
            'display': 'block',
            'position': 'absolute',
            'z-index': '2000',
            'top': String(yPosition - 60) + "px",
            'left': String(xPosition - 230) + "px",
            'background-image': 'url(../Images/WhiteBack.jpg)',
            'border-radius': '7px',
            'text-align': 'center'
        });
        $('#FilterDiv').show();
    }
    else {
        $('#FilterDiv').hide();
    }
}
function ClearFilter() {
    $('#ddlFilter').val('ad');
    $('#Search').val('fads');
    Search();
    $('#Search').val('');
    $('#ddlFilter').val('')
    $('#FilterDiv').hide();
    return false;
}
function keyup_removeclass1(e) {
    $("#" + e.target.id + "").parent().removeClass("has-error");
}

//////////////For Uploading File//////////////////////
function UploadFile(id, Urlpath, strfolder) {
    //debugger;
    if (document.getElementById(id).files[0] != null) {
        var file = document.getElementById(id).files[0];
        var fileName = file.name;
        var fd = new FormData();
        fd.append("fileData", file);
        fd.append("folder", strfolder);
        var xhr = new XMLHttpRequest();
        //xhr.upload.addEventListener("progress", function (evt) { UploadProgress(evt); }, false);
        xhr.addEventListener("load", function (evt) { UploadComplete(evt); }, false);
        xhr.addEventListener("error", function (evt) { UploadFailed(evt); }, false);
        xhr.addEventListener("abort", function (evt) { UploadCanceled(evt); }, false);
        xhr.open("POST", Urlpath, true);
        xhr.send(fd);
    }
}


function UploadProgress(evt) {
    if (evt.lengthComputable) {
        var percentComplete = Math.round(evt.loaded * 100 / evt.total);
        $("#uploading").text(percentComplete + "%");
    }
}
function UploadComplete(evt) {
    if (evt.target.status == 200) {
        if (evt.target.responseText == "OK") {
            fUploadClose("OK");
        }
        else {
            alert(evt.target.responseText);
        }
    }
    else {
        alert("Error Uploading File");
    }
}
function UploadFailed(evt) {
    alert("There was an error attempting to upload the file.");
}
function UploadCanceled(evt) {
    alert("The Upload has been canceled by the user or the browser dropped the connection.");
}
function fINVFillCheckBoxList(colid, id) {
    var arr = GetCheckCollection(colid);
    if (arr.length > 0) {
        $.post('/Campus/GetCheckBoxList', { "strid": id, "ColID": arr }, function (data) {

            debugger;
            if (data.Message != "") {
                if (data.Message == "Login Again") {
                    location.href = '/';
                }
                else {
                    alert(data.Message);
                }
            }
            else {
                var result = "";
                var Ledger = "";
                if (id == "Stock_Group") {
                    Ledger = "Stock_Ledger";
                }
                if (id == "Stock_Ledger") {
                    Ledger = "Item";
                }
                for (var i = 0; i < data.Data[0].length; i++) {
                    var row = '<label class="checkbox-inline" style="width:130px; margin-left:2px;">' +
                                '<input type="checkbox" name="chk_' + data.Data[0][i].CheckName + '" class="chk_' + id + '"  onclick=" fINVFillCheckBoxList( ' + "'" + id + "'" + ' ,' + "'" + Ledger + "'" + ');" oncontextmenu="return fSelectDeSelectMenu(event,\'chk_' + id + '\');" id="chk_' + id + '_' + data.Data[0][i].CheckID + '">' + data.Data[0][i].CheckName +
                                '</label>';
                    result = result + row;
                }
                $("#div_" + id).html(result);
            }
        }, 'json');
    }
    else {
        $("#div_" + id).html("");
    }
}


/////////////END Uploading File//////////////////////



//////// Add by Atul for Grid Search Start ///////////////

function SearchGriddata(element, gvdivname, show_per_page) {

    var value = $(element).val().toUpperCase();
    $('#page_navigation').hide();
    $("#" + gvdivname + " tbody tr ").each(function () {
        if ($(this).text().toUpperCase().indexOf(value) > -1 || $(this).text().toLowerCase().indexOf(value) > -1) {
            $(this).show();
        }
        else {
            $(this).hide();
        }
    });
    debugger;
    if (value == "") {

        Custom_Pagination(gvdivname, show_per_page, 5);
        $('#page_navigation').show();
    }


}

// For Paging
function Custom_Pagination(tableID, show_per_page, number_of_pageDisplay) {
    debugger;
    var number_of_items = $("#" + tableID + " tbody tr").size();
    $('#page_navigation').show();
    if (number_of_items <= show_per_page) {
        $('#page_navigation').hide();
        return false;
    }
    var number_of_page = Math.ceil(number_of_items / show_per_page);


    $('#current_page').val(1);
    $('#show_per_page').val(show_per_page);
    var navigation_html = '<a id="FirstId"  style="margin-left: 2px;" class="page_link btn btn-info" href="javascript:first()">First</a>';

    navigation_html += '<a  id="PreId"  style="margin-left: 2px;" class="previou_link  btn btn-info" href="javascript:callPrev();" title="Previous Page"> << </a>';
    var current_link = 1;
    while (number_of_page >= current_link) {

        if (current_link <= number_of_pageDisplay) {
            navigation_html += '<a id="pageId_' + current_link + '" style="margin-left: 2px;" class="btnfirstShow page_link btn btn-info" href="javascript:showPage(' + current_link + ')" longdesc="' + current_link + '">' + (current_link) + '</a>';

        } else {
            navigation_html += '<a id="pageId_' + current_link + '"  style="margin-left: 2px;" class="btnlastShow page_link btn btn-info" href="javascript:showPage(' + current_link + ')" longdesc="' + current_link + '">' + (current_link) + '</a>';

        }
        current_link++;
    }

    navigation_html += '<a  id="NexId"  style="margin-left: 2px;"  class="previou_link  btn btn-info" href="javascript:next();" title="Next Page"> >> </a>';
    if (number_of_page < current_link) {
        navigation_html += '<a id="Lastid"  style="margin-left: 2px;" class=" page_link  btn btn-info" href="javascript:last(' + number_of_page + ')">Last</a>';
    }
    $('#page_navigation').html(navigation_html);
    $('.btnlastShow').hide();
    $("#" + tableID + " tbody tr").hide();
    for (var i = 0; i < show_per_page; i++) {
        $("#" + tableID + " tbody tr").eq(i).show();
    }
    var pageSize = show_per_page;
    $('#FirstId').hide();
    $('#PreId').hide();
    showPage = function (Page) {
        $("#" + tableID + " tbody tr").hide();
        $('#current_page').val(Page);
        AddAcitveCss(Page);

        if (Page > 1) {
            $('#FirstId').show();
            $('#PreId').show();
        }
        else {
            $('#FirstId').hide();
        }
        $('#NexId').show();
        $('#Lastid').show();
        if (Page == 1) {
            $('#PreId').hide();
        }

        else if (Page == number_of_page) {
            $('#NexId').hide();
            $('#Lastid').hide();
            $('#FirstId').show();
        }
        else {
            $('#PreId').show();
        }
        if (Page >= number_of_pageDisplay) {
            var Actulpaging = 0;
            if (Page > number_of_pageDisplay) {
                Actulpaging = Page - number_of_pageDisplay;
            }
            if (Page == number_of_page)//case for click on last page 
            {
                for (i = 1; i <= Page ; i++) {
                    if (i <= Actulpaging) {
                        $('#pageId_' + i).hide();
                    }
                    else {
                        $('#pageId_' + (i)).show();
                    }
                }
            }

        }

        $("#" + tableID + " tbody tr").each(function (n) {
            if (n >= pageSize * (Page - 1) && n < (pageSize * Page))
                $(this).show();
        })
    }
    callPrev = function () {
        new_page = parseInt($('#current_page').val()) - 1;
        $('#current_page').val(new_page);
        AddAcitveCss(new_page);
        Pagination(new_page);
        showPage(new_page);
        $('#NexId').show();

    }
    next = function () {
        new_page = parseInt($('#current_page').val()) + 1;
        AddAcitveCss(new_page);
        Pagination(new_page);
        if ((new_page - 1) == number_of_page) {
            $('#NexId').hide();
            $('#FirstId').show();
        }
        showPage(new_page);

    }
    last = function (number_of_page) {
        new_page = number_of_page;

        $('#current_page').val(new_page);
        showPage(new_page);
        $('#NexId').hide();
        $('#PreId').show();
    }

    first = function () {
        $('.btnlastShow').hide();
        $('#PreId').hide();
        $('.btnfirstShow').show();
        $('#NexId').show();
        $('#Lastid').show();
        showPage(1);
    }
    $('#pageId_1').addClass('active');

    AddAcitveCss = function (pageNo) {
        $('.btnlastShow').removeClass('active');
        $('.btnfirstShow').removeClass('active');
        $('#pageId_' + pageNo).addClass('active');
    }
    Pagination = function (new_page) {
        var NoPaging = number_of_page > (new_page + number_of_pageDisplay) ? (new_page + number_of_pageDisplay) : number_of_page
        var actualnopaging = NoPaging > number_of_pageDisplay ? NoPaging - number_of_pageDisplay : NoPaging;
        if (number_of_page > number_of_pageDisplay) {
            for (i = 1; i <= number_of_page ; i++) {
                if (new_page > i && actualnopaging > i) {

                    $('#pageId_' + i).hide();

                } else if (NoPaging > i) {
                    $('#pageId_' + (i)).show();
                } else {
                    $('#pageId_' + i).hide();
                }
            }

        } else {
            $('#PreId').show();
        }
    }

}

function serachonload(gvdivname, show_per_page) {
    var submitIcon = $('.searchbox-icon');
    var inputBox = $('.searchbox-input');
    var searchBox = $('.searchbox');
    var isOpen = false;
    submitIcon.click(function () {
        if (isOpen == false) {
            searchBox.addClass('searchbox-open');
            inputBox.focus();
            isOpen = true;
        }
        else {
            searchBox.removeClass('searchbox-open');
            inputBox.focusout();
            isOpen = false;
        }
    })
    $('#ddlGridSearch').attr("onkeyup", "return SearchGriddata(this, '" + gvdivname + "'," + show_per_page + ");");

    Custom_Pagination(gvdivname, show_per_page, 5);

}


//////// Grid Search END ///////////////

function CheckPhotoDPI(Type, CtrlName) {
    var data = new FormData();
    data.append('FileName', document.getElementById(CtrlName).files[0]);
    data.append('Type', Type);

    var Urlpath = '/CCWeb/CheckPhotoDPI';
    xmlPost(data, Urlpath);
    return false;
}





//Start Added by Atul for Checking Uploading File Content ////////////////////

function checkFile(input, ImageType, name) {

    var fileType = "";
    if (input.files[0].type.match('image/jp.*')) {
        fileType = "JPG";
    }
    else if (input.files[0].type == 'image/png') {
        fileType = "PNG";
    }
    else if (input.files[0].type == 'application/pdf') {
        fileType = "PDF";
    }

    if (fileType == "") {
        alert("You can upload a " + ImageType + " formats only.");
        $(name).val('');
        return false;
    }

    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var bytes = new Uint8Array(e.target.result);
            if (fileType == "JPG") {
                if (bytes.length > 4 && bytes[0] == 0xFF && bytes[1] == 0xD8 && bytes[2] == 0xFF && bytes[3] == 0xE0) {
                    // alert('OK');
                }
                else {
                    alert("You can upload a " + ImageType + " formats only.");
                    $(name).val('');
                    return false;
                }
            }
            else if (fileType == "PNG") {
                if (bytes.length > 4 && bytes[0] == 0x89 && bytes[1] == 0x50 && bytes[2] == 0x4E && bytes[3] == 0x47) {
                    // alert('OK');
                }
                else {
                    alert("You can upload a " + ImageType + " formats only.");
                    $(name).val('');
                    return false;
                }
            }
            else if (fileType == "PDF") {
                if (bytes.length > 4 && bytes[0] == 0x25 && bytes[1] == 0x50 && bytes[2] == 0x44 && bytes[3] == 0x46) {
                    // alert('OK');
                }
                else {
                    alert("You can upload a " + ImageType + " formats only.");
                    $(name).val('');
                    return false;
                }
            }
        }
        reader.readAsArrayBuffer(input.files[0]);
    }
}

//END  Checking Uploading File Content ////////////////////
