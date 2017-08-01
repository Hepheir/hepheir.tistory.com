var nubiz = {};
var nubizList = [];
var nubizAjaxCount = 0;

function initNubizAjax() {
    var b = [];
    $.each($(".na"), function(c, d) {
        b.push(nubizTrimUrl(d.href))
    });
    $.each(b, function(c, d) {
        if ($.inArray(d, nubizList) === -1) {
            nubizList.push(d)
        }
    });
    for (var a = 0; a < nubizList.length; ++a) {
        nubizAjax(nubizTrimUrl(nubizList[a]))
    }
}

function nubizTrimUrl(a) {
    var b = document.createElement("a");
    b.href = a;
    return b.pathname
}

function thumbSizing(a, b) {
    if (!a) {
        return a
    }
    var c = a.replace("image", b);
    c = c.replace("original", b);
    return c
}

function nubizAjax(a) {
    var b = {};
    var c = {};
    $.ajax({
        url: a,
        success: function(e) {
            e = e.replace(/src/g, "NOsrc");
            var d = $(e);
            b.thumb = $(d).filter("meta[property='og:image']").attr("content");
            if (!b.thumb) {
                b.thumb = $(d).find("article img").first().attr("NOsrc")
            }
            $(d).find(".name a").each(function(f, g) {
                c[$(g).text().trim()] = $(g).parent().find("[alt='BlogIcon']").attr("NOsrc")
            });
            b.commentors = c;
            nubiz[a] = b;
            nubizAjaxCount++;
            if (nubizAjaxCount === nubizList.length) {
                insertThumbs()
            }
        },
        error: function() {},
    })
}

function insertThumbs() {
    $(".na.naThumb").each(function(b, c) {
        var a = nubiz[nubizTrimUrl(c.href)].thumb;
        a = thumbSizing(a, "C50x50");
        $(c).children(".thumb").attr("src", a)
    });
    $(".na.naCommentorThumb").each(function(c, d) {
        var b = $(d).find(".name").text().trim();
        var a = nubiz[nubizTrimUrl(d.href)].commentors[b];
        a = thumbSizing(a, "C50x50");
        $(d).children(".thumb").attr("src", a)
    })
}
initNubizAjax();

function blogSearch(a) {
    var b = location.pathname.split("/")[1];
    if (b == "category" || b == "search" || b == "archive") {
        location.href = "/search/" + encodeURI(a)
    } else {
        $("body,html").animate({
            scrollTop: "0"
        });
        $("#searchResult").html("");
        $("#searchResultWrap").addClass("opened");
        $("#searchResult").append('<div class="loader"></div>');
        $("#searchResult").load(location.protocol + "//" + location.host + "/search/" + encodeURI(a) + " .searchTitle,.entryList", function() {
            $("#searchResult .entryList").addClass("appearing");
            $("#goToEntireList").attr("href", location.protocol + "//" + location.host + "/search/" + encodeURI(a));
            $("#searchResultWrap").css("height", ($("#searchResult").height() + 70) + "px");
            $("#searchResult .loader").remove()
        })
    }
}

function closeBlogSearch() {
    $("#searchResultWrap").removeClass("opened");
    $("#searchResult").html("")
}

function desktopMode() {
    if (isMobile == "mobile" || isMobile == "tablet") {
        if (desktopModeSwitch == "on") {
            sessionStorage.desktopModeSwitch = "off";
            location.reload()
        } else {
            alert("페이지 하단의 버튼을 누르면 원래대로 돌아옵니다.");
            window.scrollTo(0, 0);
            sessionStorage.desktopModeSwitch = "on";
            location.reload()
        }
    } else {
        alert("모바일 환경에서만 동작합니다.")
    }
}
$(document).ready(function() {
    $("header #searchBox>input").blur(function() {
        $("header #searchBox").removeClass("opened")
    });
    $("header a.searchIcon").click(function() {
        $("header #searchBox").addClass("opened");
        $("header #searchBox>input").focus()
    });
    $("#searchResultClose").click(function() {
        closeBlogSearch()
    });
    var p = $("aside>.sidebar-temp>div,aside>.sidebar-temp>section");
    var g = $("aside>#sidebar-col1");
    var f = $("aside>#sidebar-col2");
    var l = 2;
    if ($("html").outerWidth() < 768) {
        l = 1
    }

    function e() {
        $("aside .appearing").removeClass("appearing");
        for (var d = 0; d <= p.length; d++) {
            $("aside .sidebar-temp").append(p[d])
        }
        j = 0;
        var r = setInterval(function() {
            if (l == 2) {
                if (g.height() <= f.height()) {
                    g.append(p[j])
                } else {
                    f.append(p[j])
                }
            } else {
                g.append(p[j])
            }
            j++;
            if (j == p.length) {
                clearInterval(r)
            }
        }, 150)
    }
    $(window).resize(function() {
        var d = l;
        if ($("html").outerWidth() < 768) {
            l = 1
        } else {
            l = 2
        }
        if (d !== l) {
            e()
        }
    });

    function a() {
        if (($(window).scrollTop() + $(window).innerHeight() + 100) > $("aside").offset().top) {
            if (q === 0) {
                e();
                q++
            }
        }
    }
    var q = 0;
    a();
    $(window).scroll(function() {
        a();
        if ($(window).scrollTop() === 0) {
            $("#toTop").hide()
        } else {
            $("#toTop").show()
        }
    });
    if (navigator.userAgent.match(/Mobile|iP(hone|od)|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/)) {
        isMobile = "mobile"
    } else {
        if (navigator.userAgent.match(/Android|iPad/)) {
            isMobile = "tablet"
        } else {
            isMobile = "notMobile"
        }
    }
    if (desktopModeSwitch == "on" && (isMobile == "mobile" || isMobile == "tablet")) {
        $("body").append('<button onclick="desktopMode()" style="width:100%;font-size: 3em;color:#999;padding:2em;border: gray solid .3em;">모바일 화면으로 돌아가기</button>')
    }
    $(".tab_content").hide();
    $(".tab_content").each(function(d, r) {
        $(r).parent().children().first().show()
    });
    $(".tabs li").click(function() {
        var d = $(this).attr("rel");
        $(this).parent().parent().parent().find("li").removeClass("active");
        $(this).addClass("active");
        $(this).parent().parent().parent().parent().find(".tab_content").hide();
        $(this).parent().parent().parent().parent().find("." + d).fadeIn()
    });
    if (navigator.userAgent.match(/Firefox|Chrome\/3|Chrome\/2/)) {
        return false
    } else {
        var o, b, h, n, k;
        ink_id_arr = [];
        $(".ripplelink").mousedown(function(d) {
            b = "ink" + Math.round(Math.random() * 1000);
            ink_id_arr.push(b);
            $(this).prepend("<span class='ink " + b + "'></span>");
            o = $(this).find("." + b);
            if (!o.height() && !o.width()) {
                h = Math.max($(this).outerWidth(), $(this).outerHeight());
                o.css({
                    height: h,
                    width: h
                })
            }
            n = d.pageX - $(this).offset().left - o.width() / 2;
            k = d.pageY - $(this).offset().top - o.height() / 2;
            o.css({
                top: k + "px",
                left: n + "px"
            }).addClass("animate");
            window.setTimeout(function() {
                $("." + ink_id_arr[0]).remove();
                ink_id_arr.shift()
            }, 900)
        })
    }
    if (autoLinkON === undefined) {
        autoLinkON = 1
    }
    if (autoLinkON !== 0) {
        var c = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
        var i = /\.(?:jpe?g|gif|png)$/i;

        function m(d) {
            var r = c;
            return d.replace(r, function(s) {
                i.lastIndex = 0;
                if (i.test(s)) {
                    return '<img src="' + s + '" class="autoAddedImg" />'
                } else {
                    return '<a href="' + s + '" target="_blank">' + s + "</a>"
                }
            })
        }
        $(".comment p.desc, .guestList p.desc").each(function(d, r) {
            $(r).html(m($(r).html()))
        })
    }
});

function modDate(a) {
    $("." + a + " a").addClass("abuseReport");
    $("." + a + " .abuseReport").each(function(b, c) {
        $(c).parent().parent().append(c)
    });
    $("." + a).each(function() {
        if (!$(this).is(".modDate")) {
            var m, f, o, i, g, h, e, c, d, l, k, b, n;
            m = $(this).text().trim();
            e = new Date();
            c = new Date();
            switch (m.length) {
                case 4:
                    b = m;
                    e.setFullYear(b);
                    break;
                case 5:
                    if (m.match(":")) {
                        g = m.substring(0, 2);
                        h = m.substring(3, 5);
                        e.setHours(g, h)
                    } else {
                        if (m.match(".")) {
                            o = m.substring(0, 2);
                            i = m.substring(3, 5);
                            e.setMonth(o - 1, i)
                        }
                    }
                    break;
                case 8:
                    g = m.substring(0, 2);
                    h = m.substring(3, 5);
                    e.setHours(g, h);
                    break;
                case 10:
                    f = m.substring(0, 4);
                    o = m.substring(5, 7);
                    i = m.substring(8, 10);
                    e.setFullYear(f, o - 1, i);
                    break;
                case 16:
                    f = m.substring(0, 4);
                    o = m.substring(5, 7);
                    i = m.substring(8, 10);
                    g = m.substring(11, 13);
                    h = m.substring(14, 16);
                    e.setFullYear(f, o - 1, i);
                    e.setHours(g, h);
                    break;
                default:
                    n = true;
                    break
            }
            if (!n) {
                if (g) {
                    k = e.getFullYear() + "년 " + (e.getMonth() + 1) + "월 " + e.getDate() + "일 " + e.getHours() + "시 " + e.getMinutes() + "분"
                } else {
                    if (o) {
                        k = e.getFullYear() + "년 " + (e.getMonth() + 1) + "월 " + e.getDate() + "일"
                    } else {
                        k = e.getFullYear() + "년"
                    }
                }
                d = e.getTime();
                l = c.getTime();
                b = l - d;
                $(this).attr("title", k);
                b = b / 1000;
                if (g) {
                    if (b < 240) {
                        $(this).text("방금")
                    } else {
                        if (b < 3600) {
                            b = Math.round(b / 60);
                            $(this).text(b + "분 전")
                        } else {
                            if (b < 86400) {
                                b = Math.round(b / 3600);
                                $(this).text(b + "시간 전")
                            }
                        }
                    }
                } else {
                    if (b < 86400) {
                        b = k;
                        $(this).text("오늘")
                    }
                }
                if (b >= 86400) {
                    b = b - c.getHours() * 60 * 60;
                    b = Math.ceil(b / 86400);
                    if (b < 7) {
                        $(this).text(b + "일 전")
                    } else {
                        if (b < 60) {
                            b = Math.round(b / 7);
                            $(this).text(b + "주 전")
                        } else {
                            if (b < 305) {
                                b = Math.round(b / 30.5);
                                $(this).text(b + "개월 전")
                            } else {
                                b = k;
                                $(this).text(b)
                            }
                        }
                    }
                }
                $(this).addClass("modDate")
            }
        }
    })
}
if (modDateON === undefined) {
    modDateON = 1
}
if (modDateON !== 0) {
    modDate("date");
    modDate("teditionInfo")
}
if ($(".no-more-next").length !== 0) {
    $(".loadNextPage").attr("onclick", "").addClass("disabled")
}

function loadNextPage() {
    var e, d, b, a, c;
    e = $("#nextPage").attr("href");
    if (!e || $(".no-more-next").length !== 0) {
        return false
    }
    $("#entry").append('<div class="loader"></div>');
    d = function() {
        $.ajax({
            url: e,
            success: function(f) {
                b = $(f);
                a = $(b).find("#nextPage").attr("href");
                c = $(b).find("#entry .entryList");
                guestList = $(b).find("#entry .guestList");
                $("#nextPage").attr("href", a);
                $("#entry").append(c);
                $("#guestList>ul").append(guestList);
                modDate("date");
                if (b.find(".no-more-next").length !== 0) {
                    $("#nextPage").addClass("no-more-next");
                    $(".loadNextPage").attr("onclick", "").addClass("disabled")
                }
                $("#entry .loader").remove()
            },
            error: function() {
                e = decodeURI(e.substring(31, e.length - 11));
                d()
            }
        })
    };
    d()
};