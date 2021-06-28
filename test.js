!(function (e) {
  "use strict";
  function t() {
    (eltdf.scroll = e(window).scrollTop()),
      eltdf.body.hasClass("eltdf-dark-header") &&
        (eltdf.defaultHeaderStyle = "eltdf-dark-header"),
      eltdf.body.hasClass("eltdf-light-header") &&
        (eltdf.defaultHeaderStyle = "eltdf-light-header");
  }
  function a() {}
  function d() {
    (eltdf.windowWidth = e(window).width()),
      (eltdf.windowHeight = e(window).height());
  }
  function l() {
    eltdf.scroll = e(window).scrollTop();
  }
  switch (
    ((window.eltdf = {}),
    (eltdf.modules = {}),
    (eltdf.scroll = 0),
    (eltdf.window = e(window)),
    (eltdf.document = e(document)),
    (eltdf.windowWidth = e(window).width()),
    (eltdf.windowHeight = e(window).height()),
    (eltdf.body = e("body")),
    (eltdf.html = e("html, body")),
    (eltdf.htmlEl = e("html")),
    (eltdf.menuDropdownHeightSet = !1),
    (eltdf.defaultHeaderStyle = ""),
    (eltdf.minVideoWidth = 1500),
    (eltdf.videoWidthOriginal = 1280),
    (eltdf.videoHeightOriginal = 720),
    (eltdf.videoRatio = 1.61),
    (eltdf.eltdfOnDocumentReady = t),
    (eltdf.eltdfOnWindowLoad = a),
    (eltdf.eltdfOnWindowResize = d),
    (eltdf.eltdfOnWindowScroll = l),
    e(document).ready(t),
    e(window).load(a),
    e(window).resize(d),
    e(window).scroll(l),
    !0)
  ) {
    case eltdf.body.hasClass("eltdf-grid-1300"):
      eltdf.boxedLayoutWidth = 1350;
      break;
    case eltdf.body.hasClass("eltdf-grid-1200"):
      eltdf.boxedLayoutWidth = 1250;
      break;
    case eltdf.body.hasClass("eltdf-grid-1000"):
      eltdf.boxedLayoutWidth = 1050;
      break;
    case eltdf.body.hasClass("eltdf-grid-800"):
      eltdf.boxedLayoutWidth = 850;
      break;
    default:
      eltdf.boxedLayoutWidth = 1150;
  }
  (eltdf.gridWidth = function () {
    var e = 1100;
    switch (!0) {
      case eltdf.body.hasClass("eltdf-grid-1300") && 1400 < eltdf.windowWidth:
        e = 1300;
        break;
      case eltdf.body.hasClass("eltdf-grid-1200") && 1300 < eltdf.windowWidth:
      case eltdf.body.hasClass("eltdf-grid-1000") && 1200 < eltdf.windowWidth:
        e = 1200;
        break;
      case eltdf.body.hasClass("eltdf-grid-800") && 1024 < eltdf.windowWidth:
        e = 800;
    }
    return e;
  }),
    (eltdf.transitionEnd = (function () {
      var e = document.createElement("transitionDetector"),
        t = {
          WebkitTransition: "webkitTransitionEnd",
          MozTransition: "transitionend",
          transition: "transitionend",
        };
      for (var a in t) if (void 0 !== e.style[a]) return t[a];
    })()),
    (eltdf.animationEnd = (function () {
      var e = document.createElement("animationDetector"),
        t = {
          animation: "animationend",
          OAnimation: "oAnimationEnd",
          MozAnimation: "animationend",
          WebkitAnimation: "webkitAnimationEnd",
        };
      for (var a in t) if (void 0 !== e.style[a]) return t[a];
    })());
})(jQuery),
  (function (H) {
    "use strict";
    var e = {};
    function t() {
      var e, t, a;
      h().init(),
        -1 < navigator.appVersion.toLowerCase().indexOf("mac") &&
          eltdf.body.hasClass("eltdf-smooth-scroll") &&
          eltdf.body.removeClass("eltdf-smooth-scroll"),
        i().init(),
        H("#eltdf-back-to-top").on("click", function (e) {
          e.preventDefault(),
            eltdf.html.animate(
              { scrollTop: 0 },
              eltdf.window.scrollTop() / 5,
              "easeOutQuad"
            );
        }),
        eltdf.window.scroll(function () {
          var e = H(this).scrollTop(),
            t = H(this).height();
          s((0 < e ? e + t / 2 : 1) < 1e3 ? "off" : "on");
        }),
        r(),
        P(),
        D(),
        p(),
        (e = H(".eltdf-preload-background")).length &&
          e.each(function () {
            var e = H(this);
            if (
              "" !== e.css("background-image") &&
              "none" !== e.css("background-image")
            ) {
              var t = e.attr("style");
              if (
                (t = (t = t.match(/url\(["']?([^'")]+)['"]?\)/)) ? t[1] : "")
              ) {
                var a = new Image();
                (a.src = t),
                  H(a).load(function () {
                    e.removeClass("eltdf-preload-background");
                  });
              }
            } else
              H(window).load(function () {
                e.removeClass("eltdf-preload-background");
              });
          }),
        f(),
        (t = H(".eltdf-search-post-type")).length &&
          t.each(function () {
            var e = H(this),
              t = e.find(".eltdf-post-type-search-field"),
              d = e.siblings(".eltdf-post-type-search-results"),
              l = e.find(".eltdf-search-loading"),
              n = e.find(".eltdf-search-icon");
            l.addClass("eltdf-hidden");
            var o,
              i = e.data("post-type");
            t.on("keyup paste", function () {
              var a = H(this);
              a.attr("autocomplete", "off"),
                l.removeClass("eltdf-hidden"),
                n.addClass("eltdf-hidden"),
                clearTimeout(o),
                (o = setTimeout(function () {
                  var e = a.val();
                  if (e.length < 3)
                    d.html(""),
                      d.fadeOut(),
                      l.addClass("eltdf-hidden"),
                      n.removeClass("eltdf-hidden");
                  else {
                    var t = {
                      action: "sahel_elated_search_post_types",
                      term: e,
                      postType: i,
                    };
                    H.ajax({
                      type: "POST",
                      data: t,
                      url: eltdfGlobalVars.vars.eltdfAjaxUrl,
                      success: function (e) {
                        var t = JSON.parse(e);
                        "success" === t.status &&
                          (l.addClass("eltdf-hidden"),
                          n.removeClass("eltdf-hidden"),
                          d.html(t.data.html),
                          d.fadeIn());
                      },
                      error: function (e, t, a) {
                        console.log("Status: " + t),
                          console.log("Error: " + a),
                          l.addClass("eltdf-hidden"),
                          n.removeClass("eltdf-hidden"),
                          d.fadeOut();
                      },
                    });
                  }
                }, 500));
            }),
              t.on("focusout", function () {
                l.addClass("eltdf-hidden"),
                  n.removeClass("eltdf-hidden"),
                  d.fadeOut();
              });
          }),
        (a = H(".eltdf-dashboard-form")).length &&
          a.each(function () {
            var e = H(this),
              l = e.find("button"),
              n = l.data("updating-text"),
              o = l.data("updated-text"),
              i = e.data("action");
            e.on("submit", function (e) {
              e.preventDefault();
              var a = l.html(),
                t = H(this).find(".eltdf-dashboard-gallery-upload-hidden"),
                r = [];
              l.html(n);
              var f = new FormData();
              t.each(function () {
                var e,
                  t = H(this),
                  a = t.attr("name"),
                  d = t.attr("id"),
                  l = t[0].files;
                if ("-1" !== a.indexOf("[")) {
                  e = a.substring(0, a.indexOf("[")) + "_eltdf_regarray_";
                  var n = d.indexOf("["),
                    o = d.indexOf("]"),
                    i = d.substring(n + 1, o);
                  r.push(e), (e = e + i + "_");
                } else e = a + "_eltdf_reg_";
                0 === l.length &&
                  f.append(
                    e,
                    new File([""], "eltdf-dummy-file.txt", {
                      type: "text/plain",
                    })
                  );
                for (var s = 0; s < l.length; s++)
                  1 === l[s].name.match(/\./g).length &&
                    -1 !==
                      H.inArray(l[s].type, [
                        "image/png",
                        "image/jpg",
                        "image/jpeg",
                        "application/pdf",
                      ]) &&
                    f.append(e + s, l[s]);
              }),
                f.append("action", i);
              var d = H(this).serialize();
              return (
                f.append("data", d),
                H.ajax({
                  type: "POST",
                  data: f,
                  contentType: !1,
                  processData: !1,
                  url: eltdfGlobalVars.vars.eltdfAjaxUrl,
                  success: function (e) {
                    var t;
                    (t = JSON.parse(e)),
                      eltdf.modules.socialLogin.eltdfRenderAjaxResponseMessage(
                        t
                      ),
                      "success" === t.status
                        ? (l.html(o), (window.location = t.redirect))
                        : l.html(a);
                  },
                }),
                !1
              );
            });
          }),
        c(),
        (function () {
          var e = H("[data-dynamic-bgrnd]");
          if (
            eltdf.body.hasClass("eltdf-dynamic-background-color") &&
            e.length
          ) {
            H(".eltdf-content-inner").append(
              '<div id="eltdf-dynamic-bgrnds"></div'
            );
            var t,
              a,
              d,
              l = H("#eltdf-dynamic-bgrnds"),
              n = eltdf.scroll,
              o = !0;
            e.each(function () {
              g(H(this));
            });
            l.css("background-color", e.first().attr("data-dynamic-bgrnd")),
              H(window).on("scroll", function () {
                !(function () {
                  (t = eltdf.scroll), (o = n < t);
                  n = t;
                })(),
                  (a = e.filter(".eltdf-in-view")).length &&
                    ((d = o ? a.last() : a.first()),
                    l.css("background-color") !==
                      d.attr("data-dynamic-bgrnd") &&
                      l.css("background-color", d.attr("data-dynamic-bgrnd")));
              });
          }
        })(),
        H(".eltdf-content-fade-in .eltdf-eh-item-content > div ").each(
          function () {
            g(H(this));
          }
        ),
        H("[data-parallax]").length &&
          !eltdf.htmlEl.hasClass("touch") &&
          ParallaxScroll.init(),
        (function () {
          if (
            eltdf.body.hasClass("eltdf-initial-loading-animation") &&
            !eltdf.htmlEl.hasClass("touch")
          ) {
            var e = H("#eltdf-main-rev-holder .rev_slider");
            e.length && eltdf.scroll <= e.offset().top + e.height()
              ? e.bind("revolution.slide.onloaded", function () {
                  eltdf.body.addClass("eltdf-animate");
                })
              : H(document).waitForImages(function () {
                  eltdf.body.addClass("eltdf-animate");
                });
          }
        })(),
        (function () {
          if (eltdf.body.hasClass("eltdf-smooth-page-transitions")) {
            if (
              eltdf.body.hasClass("eltdf-smooth-page-transitions-preloader")
            ) {
              var t = H(
                  "body > .eltdf-smooth-transition-loader.eltdf-mimic-ajax"
                ),
                a = H("#eltdf-main-rev-holder .rev_slider"),
                d = H(".eltdf-loader-title-spinner-text:first-child"),
                l = !1,
                n = function () {
                  var e = 1e3;
                  d.parent().addClass("eltdf-done"),
                    a &&
                      !l &&
                      H(".eltdf-trigger-rev-before-load").length &&
                      ((l = !0),
                      a.revstart(),
                      (e = 750),
                      setTimeout(function () {
                        eltdf.body.addClass("eltdf-rev-started");
                      }, e)),
                    t.delay(e).fadeOut(500, "easeOutSine", function () {
                      a && !l && ((l = !0), a.revstart()),
                        H(document).trigger("eltdfLoaderRemoved");
                    }),
                    H(window).on("bind", "pageshow", function (e) {
                      e.originalEvent.persisted &&
                        (t.fadeOut(500), a && !l && ((l = !0), a.revstart()));
                    });
                };
              d.length
                ? ((i =
                    window.requestAnimationFrame ||
                    window.mozRequestAnimationFrame ||
                    window.webkitRequestAnimationFrame ||
                    window.msRequestAnimationFrame),
                  (s =
                    window.cancelAnimationFrame ||
                    window.mozCancelAnimationFrame),
                  (r = 0),
                  (f = !1),
                  d
                    .css("filter", "blur(4px)")
                    .parent()
                    .addClass("eltdf-unblur"),
                  i(function e() {
                    var t = 4 * (Math.sin((r += 0.1)) + 1);
                    if (0 == Math.round(o))
                      return (
                        d.css("filter", "none"),
                        s(e),
                        !f && d.parent().addClass("eltdf-reverse"),
                        n(),
                        !1
                      );
                    d.css({ filter: "blur(" + t + "px)" }), i(e), (o = t);
                  }),
                  H(window).on("load", function () {
                    f || ((f = !0), d.parent().addClass("eltdf-reverse"), n());
                  }))
                : H(document).waitForImages(function () {
                    n();
                  });
            }
            if (eltdf.body.hasClass("eltdf-smooth-page-transitions-fadeout")) {
              var e = H("a");
              e.on("click", function (e) {
                var t = H(this);
                ((t.parents(".eltdf-shopping-cart-dropdown").length ||
                  t.parent(".product-remove").length) &&
                  t.hasClass("remove")) ||
                  (1 === e.which &&
                    0 <= t.attr("href").indexOf(window.location.host) &&
                    void 0 === t.data("rel") &&
                    void 0 === t.attr("rel") &&
                    !t.hasClass("lightbox-active") &&
                    (void 0 === t.attr("target") ||
                      "_self" === t.attr("target")) &&
                    t.attr("href").split("#")[0] !==
                      window.location.href.split("#")[0] &&
                    (e.preventDefault(),
                    H(".eltdf-wrapper-inner").fadeOut(
                      600,
                      "easeOutQuart",
                      function () {
                        window.location = t.attr("href");
                      }
                    )));
              });
            }
          }
          var o, i, s, r, f;
        })();
    }
    function a() {
      W(), m().init();
    }
  
    function d() {
        document.addEventListener('DOMContentLoaded', c());
      c(), P();
    }
    function l(e) {
      o(e);
    }
    function n(e) {
      for (var t = [37, 38, 39, 40], a = t.length; a--; )
        if (e.keyCode === t[a]) return void o(e);
    }
    function o(e) {
      (e = e || window.event).preventDefault && e.preventDefault(),
        (e.returnValue = !1);
    }
    ((eltdf.modules.common = e).eltdfFluidVideo = D),
      (e.eltdfEnableScroll = function () {
        window.removeEventListener &&
          window.removeEventListener("wheel", l, { passive: !1 });
        window.onmousewheel = document.onmousewheel = document.onkeydown = null;
      }),
      (e.eltdfDisableScroll = function () {
        window.addEventListener &&
          window.addEventListener("wheel", l, { passive: !1 });
        document.onkeydown = n;
      }),
      (e.eltdfgetScrollX = function () {
        return null != window.pageXOffset
          ? window.pageXOffset
          : null != document.documentElement.scrollLeft
          ? document.documentElement.scrollLeft
          : document.body.scrollLeft;
      }),
      (e.eltdfgetScrollY = function () {
        return null != window.pageYOffset
          ? window.pageYOffset
          : null != document.documentElement.scrollTop
          ? document.documentElement.scrollTop
          : document.body.scrollTop;
      }),
      (e.eltdfOwlSlider = p),
      (e.eltdfInitParallax = W),
      (e.eltdfInitSelfHostedVideoPlayer = r),
      (e.eltdfSelfHostedVideoSize = P),
      (e.eltdfPrettyPhoto = f),
      (e.eltdfStickySidebarWidget = m),
      (e.getLoadMoreData = function (e) {
        var t = e.data(),
          a = {};
        for (var d in t)
          t.hasOwnProperty(d) &&
            void 0 !== t[d] &&
            !1 !== t[d] &&
            (a[d] = t[d]);
        return a;
      }),
      (e.setLoadMoreAjaxData = function (e, t) {
        var a = { action: t };
        for (var d in e)
          e.hasOwnProperty(d) &&
            void 0 !== e[d] &&
            !1 !== e[d] &&
            (a[d] = e[d]);
        return a;
      }),
      (e.setFixedImageProportionSize = u),
      (e.eltdfInitPerfectScrollbar = function () {
        var a = { wheelSpeed: 0.6, suppressScrollX: !0 };
        return {
          init: function (e) {
            var t;
            (t = new PerfectScrollbar(e.selector, a)),
              H(window).resize(function () {
                t.update();
              });
          },
        };
      }),
      (e.eltdfInitImageFX = function (e, n, o, i) {
        var s =
            window.requestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.msRequestAnimationFrame,
          r = window.cancelAnimationFrame || window.mozCancelAnimationFrame;
        (o = o || 3),
          (i = i || 0.1),
          H(e).on("mouseenter", function () {
            var a,
              d = H(this),
              l = 0;
            s(function e() {
              var t = o * (Math.sin((l += i)) + 1);
              if (0 == Math.round(a))
                return d.find(n).css("filter", "none"), r(e), !1;
              d.find(n).css({ filter: "blur(" + t + "px)" }), s(e), (a = t);
            });
          });
      }),
      (e.eltdfOnDocumentReady = t),
      (e.eltdfOnWindowLoad = a),
      (e.eltdfOnWindowResize = d),
      H(document).ready(t),
      H(window).load(a),
      H(window).resize(d);
    var i = function () {
      var o = function (t) {
          H(".eltdf-main-menu, .eltdf-mobile-nav, .eltdf-fullscreen-menu").each(
            function () {
              var e = H(this);
              t.parents(e).length &&
                (e.find(".eltdf-active-item").removeClass("eltdf-active-item"),
                t.parent().addClass("eltdf-active-item"),
                e.find("a").removeClass("current"),
                t.addClass("current"));
            }
          );
        },
        d = function (e) {
          var t,
            a = H(
              ".eltdf-main-menu a, .eltdf-mobile-nav a, .eltdf-fullscreen-menu a"
            ),
            d = e,
            l = "" !== d ? H('[data-eltdf-anchor="' + d + '"]') : "";
          if ("" !== d && 0 < l.length) {
            var n = l.offset().top;
            return (
              (t = n - i(n) - eltdfGlobalVars.vars.eltdfAddForAdminBar),
              a.length &&
                a.each(function () {
                  var e = H(this);
                  -1 < e.attr("href").indexOf(d) && o(e);
                }),
              eltdf.html
                .stop()
                .animate({ scrollTop: Math.round(t) }, 1e3, function () {
                  history.pushState && history.pushState(null, "", "#" + d);
                }),
              !1
            );
          }
        },
        i = function (e) {
          "eltdf-sticky-header-on-scroll-down-up" ===
            eltdf.modules.stickyHeader.behaviour &&
            (eltdf.modules.stickyHeader.isStickyVisible =
              e > eltdf.modules.header.stickyAppearAmount),
            "eltdf-sticky-header-on-scroll-up" ===
              eltdf.modules.stickyHeader.behaviour &&
              e > eltdf.scroll &&
              (eltdf.modules.stickyHeader.isStickyVisible = !1);
          var t = eltdf.modules.stickyHeader.isStickyVisible
            ? eltdfGlobalVars.vars.eltdfStickyHeaderTransparencyHeight
            : eltdfPerPageVars.vars.eltdfHeaderTransparencyHeight;
          return eltdf.windowWidth < 1025 && (t = 0), t;
        };
      return {
        init: function () {
          var t, e, a;
          H("[data-eltdf-anchor]").length &&
            (eltdf.document.on(
              "click",
              ".eltdf-main-menu a, .eltdf-fullscreen-menu a, .eltdf-btn, .eltdf-anchor, .eltdf-mobile-nav a",
              function () {
                var e,
                  t = H(this),
                  a = t.prop("hash").split("#")[1],
                  d = "" !== a ? H('[data-eltdf-anchor="' + a + '"]') : "";
                if ("" !== a && 0 < d.length) {
                  var l = d.offset().top;
                  return (
                    (e = l - i(l) - eltdfGlobalVars.vars.eltdfAddForAdminBar),
                    o(t),
                    eltdf.html
                      .stop()
                      .animate({ scrollTop: Math.round(e) }, 1e3, function () {
                        history.pushState &&
                          history.pushState(null, "", "#" + a);
                      }),
                    !1
                  );
                }
              }
            ),
            (e = H("[data-eltdf-anchor]")),
            "/" !== (a = window.location.href.split("#")[0]).substr(-1) &&
              (a += "/"),
            e.waypoint(
              function (e) {
                "down" === e &&
                  ((t =
                    0 < H(this.element).length
                      ? H(this.element).data("eltdf-anchor")
                      : H(this).data("eltdf-anchor")),
                  o(H("a[href='" + a + "#" + t + "']")));
              },
              { offset: "50%" }
            ),
            e.waypoint(
              function (e) {
                "up" === e &&
                  ((t =
                    0 < H(this.element).length
                      ? H(this.element).data("eltdf-anchor")
                      : H(this).data("eltdf-anchor")),
                  o(H("a[href='" + a + "#" + t + "']")));
              },
              {
                offset: function () {
                  return -(H(this.element).outerHeight() - 150);
                },
              }
            ),
            H(window).load(function () {
              var e;
              "" !== (e = window.location.hash.split("#")[1]) &&
                0 < H('[data-eltdf-anchor="' + e + '"]').length &&
                d(e);
            }));
        },
      };
    };
    function s(e) {
      var t = H("#eltdf-back-to-top");
      t.removeClass("off on"),
        "on" === e ? t.addClass("on") : t.addClass("off");
    }
    function r() {
      var e = H(".eltdf-self-hosted-video");
      e.length && e.mediaelementplayer({ audioWidth: "100%" });
    }
    function P() {
      var e = H(".eltdf-self-hosted-video-holder .eltdf-video-wrap");
      e.length &&
        e.each(function () {
          var e = H(this),
            t = e.closest(".eltdf-self-hosted-video-holder").outerWidth(),
            a = t / eltdf.videoRatio;
          navigator.userAgent.match(
            /(Android|iPod|iPhone|iPad|IEMobile|Opera Mini)/
          ) && (e.parent().width(t), e.parent().height(a)),
            e.width(t),
            e.height(a),
            e.find("video, .mejs-overlay, .mejs-poster").width(t),
            e.find("video, .mejs-overlay, .mejs-poster").height(a);
        });
    }
    function D() {
      fluidvids.init({
        selector: ["iframe"],
        players: ["www.youtube.com", "player.vimeo.com"],
      });
    }
    function f() {
      H("a[data-rel^='prettyPhoto']").prettyPhoto({
        hook: "data-rel",
        animation_speed: "normal",
        slideshow: !1,
        autoplay_slideshow: !1,
        opacity: 0.8,
        show_title: !0,
        allow_resize: !0,
        horizontal_padding: 0,
        default_width: 960,
        default_height: 540,
        counter_separator_label: "/",
        theme: "pp_default",
        hideflash: !1,
        wmode: "opaque",
        autoplay: !0,
        modal: !1,
        overlay_gallery: !1,
        keyboard_shortcuts: !0,
        deeplinking: !1,
        custom_markup: "",
        social_tools: !1,
        markup:
          '<div class="pp_pic_holder">                         <div class="ppt">&nbsp;</div>                         <div class="pp_top">                             <div class="pp_left"></div>                             <div class="pp_middle"></div>                             <div class="pp_right"></div>                         </div>                         <div class="pp_content_container">                             <div class="pp_left">                             <div class="pp_right">                                 <div class="pp_content">                                     <div class="pp_loaderIcon"></div>                                     <div class="pp_fade">                                         <a href="#" class="pp_expand" title="Expand the image">Expand</a>                                         <div class="pp_hoverContainer">                                             <a class="pp_next" href="#"><span class="lnr lnr-arrow-right"></span></a>                                             <a class="pp_previous" href="#"><span class="lnr lnr-arrow-left"></span></a>                                         </div>                                         <div id="pp_full_res"></div>                                         <div class="pp_details">                                             <div class="pp_nav">                                                 <a href="#" class="pp_arrow_previous">Previous</a>                                                 <p class="currentTextHolder">0/0</p>                                                 <a href="#" class="pp_arrow_next">Next</a>                                             </div>                                             <p class="pp_description"></p>                                             {pp_social}                                             <a class="pp_close" href="#">Close</a>                                         </div>                                     </div>                                 </div>                             </div>                             </div>                         </div>                         <div class="pp_bottom">                             <div class="pp_left"></div>                             <div class="pp_middle"></div>                             <div class="pp_right"></div>                         </div>                     </div>                     <div class="pp_overlay"></div>',
      });
    }
    function c() {
      var e = H(".eltdf-grid-masonry-list");
      e.length &&
        e.each(function () {
          var e = H(this),
            t = e.find(".eltdf-masonry-list-wrapper"),
            a = e.find(".eltdf-masonry-grid-sizer").width();
          t.waitForImages(function () {
            t.isotope({
              layoutMode: "packery",
              itemSelector: ".eltdf-item-space",
              percentPosition: !0,
              masonry: {
                columnWidth: ".eltdf-masonry-grid-sizer",
                gutter: ".eltdf-masonry-grid-gutter",
              },
            }),
              (e.find(".eltdf-fixed-masonry-item").length ||
                e.hasClass("eltdf-fixed-masonry-items")) &&
                u(t, t.find(".eltdf-item-space"), a, !0),
              setTimeout(function () {
                W();
              }, 600),
              t.isotope("layout").css("opacity", 1);
          });
        });
    }
    function u(e, t, a, d) {
      if (e.hasClass("eltdf-masonry-images-fixed") || !0 === d) {
        var l = parseInt(t.css("paddingLeft"), 10),
          n = a - 2 * l,
          o = e.find(".eltdf-masonry-size-small"),
          i = e.find(".eltdf-masonry-size-large-width"),
          s = e.find(".eltdf-masonry-size-large-height"),
          r = e.find(".eltdf-masonry-size-large-width-height");
        o.css("height", n),
          s.css("height", Math.round(2 * (n + l))),
          680 < eltdf.windowWidth
            ? (i.css("height", n), r.css("height", Math.round(2 * (n + l))))
            : (i.css("height", Math.round(n / 2)), r.css("height", n));
      }
    }
    var h = function () {
      var e = H(".eltdf-icon-has-hover");
      return {
        init: function () {
          e.length &&
            e.each(function () {
              !(function (e) {
                if (void 0 !== e.data("hover-color")) {
                  var t = function (e) {
                      e.data.icon.css("color", e.data.color);
                    },
                    a = e.data("hover-color"),
                    d = e.css("color");
                  "" !== a &&
                    (e.on("mouseenter", { icon: e, color: a }, t),
                    e.on("mouseleave", { icon: e, color: d }, t));
                }
              })(H(this));
            });
        },
      };
    };
    function W() {
      var e = H(".eltdf-parallax-row-holder");
      e.length &&
        e.each(function () {
          var e = H(this),
            t = e.data("parallax-bg-image"),
            a = 0.4 * e.data("parallax-bg-speed"),
            d = 0;
          void 0 !== e.data("parallax-bg-height") &&
            !1 !== e.data("parallax-bg-height") &&
            (d = parseInt(e.data("parallax-bg-height"))),
            e.css({ "background-image": "url(" + t + ")" }),
            0 < d && e.css({ "min-height": d + "px", height: d + "px" }),
            e.parallax("50%", a);
        });
    }
    function m() {
      var e = H(".eltdf-widget-sticky-sidebar"),
        t = H(".eltdf-page-header"),
        u = t.length ? t.outerHeight() : 0,
        o = 0,
        i = 0,
        s = 0,
        r = 0,
        h = [];
      function a() {
        h.length &&
          H.each(h, function (e) {
            h[e].object;
            var t = h[e].offset,
              a = h[e].position,
              d = h[e].height,
              l = h[e].width,
              n = h[e].sidebarHolder,
              o = h[e].sidebarHolderHeight;
            if (eltdf.body.hasClass("eltdf-fixed-on-scroll")) {
              var i = H(".eltdf-fixed-wrapper.fixed");
              i.length &&
                (u =
                  i.outerHeight() + eltdfGlobalVars.vars.eltdfAddForAdminBar);
            } else eltdf.body.hasClass("eltdf-no-behavior") && (u = eltdfGlobalVars.vars.eltdfAddForAdminBar);
            if (1024 < eltdf.windowWidth && n.length) {
              var s = -(a - u),
                r = d - a - 40,
                f = o + t - u - a - eltdfGlobalVars.vars.eltdfTopBarHeight;
              if (eltdf.scroll >= t - u && d < o)
                if (
                  (n.hasClass("eltdf-sticky-sidebar-appeared")
                    ? n.css({ top: s + "px" })
                    : n
                        .addClass("eltdf-sticky-sidebar-appeared")
                        .css({
                          position: "fixed",
                          top: s + "px",
                          width: l,
                          "margin-top": "-10px",
                        })
                        .animate({ "margin-top": "0" }, 200),
                  eltdf.scroll + r >= f)
                ) {
                  var c = o - r + s - u;
                  n.css({ position: "absolute", top: c + "px" });
                } else
                  n.hasClass("eltdf-sticky-sidebar-appeared") &&
                    n.css({ position: "fixed", top: s + "px" });
              else
                n.removeClass("eltdf-sticky-sidebar-appeared").css({
                  position: "relative",
                  top: "0",
                  width: "auto",
                });
            } else n.removeClass("eltdf-sticky-sidebar-appeared").css({ position: "relative", top: "0", width: "auto" });
          });
      }
      return {
        init: function () {
          e.length &&
            e.each(function () {
              var e = H(this),
                t = e.parents("aside.eltdf-sidebar"),
                a = e.parents(".wpb_widgetised_column"),
                d = "",
                l = 0;
              if (
                ((o = e.offset().top),
                (i = e.position().top),
                (r = s = 0),
                t.length)
              ) {
                (s = t.outerHeight()),
                  (r = t.outerWidth()),
                  (l = (d = t).parent().parent().outerHeight());
                var n = t.parent().parent().find(".eltdf-blog-holder");
                n.length && (l -= parseInt(n.css("marginBottom")));
              } else a.length && ((s = a.outerHeight()), (r = a.outerWidth()), (l = (d = a).parents(".vc_row").outerHeight()));
              h.push({
                object: e,
                offset: o,
                position: i,
                height: s,
                width: r,
                sidebarHolder: d,
                sidebarHolderHeight: l,
              });
            }),
            a(),
            H(window).scroll(function () {
              a();
            });
        },
        reInit: a,
      };
    }
    function p() {
      var e = H(".eltdf-owl-slider");
      e.length &&
        e.each(function () {
          var a,
            t = H(this),
            l = H(this),
            e = t.children().length,
            d = 1,
            n = !0,
            o = !0,
            i = !1,
            s = 3800,
            r = 600,
            f = 0,
            c = 0,
            u = 0,
            h = 0,
            m = !1,
            p = !1,
            g = !1,
            v = !1,
            y = !1,
            b = !0,
            w = !1,
            C = !1,
            x = !1,
            k = !!t.hasClass("eltdf-list-is-slider"),
            S = k ? t.parent() : t,
            I = !0;
          if (
            (void 0 === t.data("number-of-items") ||
              !1 === t.data("number-of-items") ||
              k ||
              (d = t.data("number-of-items")),
            void 0 !== S.data("number-of-columns") &&
              !1 !== S.data("number-of-columns") &&
              k)
          )
            switch (S.data("number-of-columns")) {
              case "one":
                d = 1;
                break;
              case "two":
                d = 2;
                break;
              case "three":
                d = 3;
                break;
              case "four":
                d = 4;
                break;
              case "five":
                d = 5;
                break;
              case "six":
                d = 6;
                break;
              default:
                d = 4;
            }
          "no" === S.data("enable-loop") && (n = !1),
            "no" === S.data("enable-autoplay") && (o = !1),
            "no" === S.data("enable-autoplay-hover-pause") && (i = !1),
            void 0 !== S.data("slider-speed") &&
              !1 !== S.data("slider-speed") &&
              (s = S.data("slider-speed")),
            void 0 !== S.data("slider-speed-animation") &&
              !1 !== S.data("slider-speed-animation") &&
              (r = S.data("slider-speed-animation")),
            void 0 !== S.data("slider-margin") && !1 !== S.data("slider-margin")
              ? (f =
                  "no" === S.data("slider-margin")
                    ? 0
                    : S.data("slider-margin"))
              : t.parent().hasClass("eltdf-huge-space")
              ? (f = 80)
              : t.parent().hasClass("eltdf-large-space")
              ? (f = 50)
              : t.parent().hasClass("eltdf-medium-space")
              ? (f = 40)
              : t.parent().hasClass("eltdf-normal-space")
              ? (f = 30)
              : t.parent().hasClass("eltdf-small-space")
              ? (f = 20)
              : t.parent().hasClass("eltdf-tiny-space") && (f = 10),
            "yes" === S.data("slider-padding") &&
              ((m = !0), (h = parseInt(0.28 * t.outerWidth())), (f = 50)),
            "yes" === S.data("enable-center") && (p = !0),
            "yes" === S.data("enable-auto-width") && (g = !0),
            void 0 !== S.data("slider-animate-in") &&
              !1 !== S.data("slider-animate-in") &&
              (v = S.data("slider-animate-in")),
            void 0 !== S.data("slider-animate-out") &&
              !1 !== S.data("slider-animate-out") &&
              (y = S.data("slider-animate-out")),
            "no" === S.data("enable-navigation") && (b = !1),
            "yes" === S.data("enable-pagination") && (w = !0),
            "yes" === S.data("enable-pagination-names") && (C = w = !0),
            "yes" === S.data("enable-thumbnail") && (x = !0),
            x && !w && ((w = !0), l.addClass("eltdf-slider-hide-pagination")),
            b && w && t.addClass("eltdf-slider-has-both-nav"),
            e <= 1 && (w = b = o = n = !1);
          var O = 2,
            _ = 3,
            T = d,
            z = d;
          if (
            (d < 3 && (_ = O = d),
            4 < d && (T = 4),
            5 < d && (z = 5),
            (m || 30 < f) && ((c = 20), (u = 30)),
            0 < f && f <= 30 && (u = c = f),
            t.waitForImages(function () {
              l = t.owlCarousel({
                items: d,
                loop: n,
                autoplay: o,
                autoplayHoverPause: i,
                autoplayTimeout: s,
                smartSpeed: r,
                margin: f,
                stagePadding: h,
                center: p,
                autoWidth: g,
                animateIn: v,
                animateOut: y,
                dots: w,
                nav: b,
                navText: [
                  '<span class="eltdf-prev-icon ' +
                    eltdfGlobalVars.vars.sliderNavPrevArrow +
                    '"></span>',
                  '<span class="eltdf-next-icon ' +
                    eltdfGlobalVars.vars.sliderNavNextArrow +
                    '"></span>',
                ],
                responsive: {
                  0: {
                    items: 1,
                    margin: c,
                    stagePadding: 0,
                    center: !1,
                    autoWidth: !1,
                  },
                  681: { items: O, margin: u },
                  769: { items: _, margin: u },
                  1025: { items: T },
                  1281: { items: z },
                  1367: { items: d },
                },
                onInitialize: function () {
                  t.css("visibility", "visible"),
                    W(),
                    (t.find("iframe").length || t.find("video").length) &&
                      setTimeout(function () {
                        P(), D();
                      }, 500),
                    x &&
                      a
                        .find(".eltdf-slider-thumbnail-item:first-child")
                        .addClass("active");
                },
                onInitialized: function () {
                  if (C) {
                    var d = t.find(".owl-item:not(.cloned) .eltdf-pag-name");
                    t.find(".owl-dots .owl-dot").each(function (e) {
                      var t = H(this),
                        a = d.eq(e).html();
                      t.html(
                        '<span class="eltdf-owl-pag-name">' + a + "</span>"
                      );
                    });
                  }
                  t.closest("#panel-admin").length &&
                    H(document).on("mousewheel", function (e) {
                      eltdf.body.hasClass("eltdf-toolbar-opened") &&
                        (e.preventDefault(),
                        I &&
                          (0 < e.deltaY
                            ? l.trigger("prev.owl.carousel")
                            : l.trigger("next.owl.carousel")));
                    });
                },
                onRefreshed: function () {
                  if (!0 === g) {
                    var e = parseInt(t.find(".owl-stage").css("width"));
                    t.find(".owl-stage").css("width", e + 1 + "px");
                  }
                },
                onTranslate: function (e) {
                  if (((I = !1), x)) {
                    var t = e.page.index + 1;
                    a
                      .find(".eltdf-slider-thumbnail-item.active")
                      .removeClass("active"),
                      a
                        .find(
                          ".eltdf-slider-thumbnail-item:nth-child(" + t + ")"
                        )
                        .addClass("active");
                  }
                },
                onTranslated: function () {
                  I = !0;
                },
                onDrag: function (e) {
                  eltdf.body.hasClass(
                    "eltdf-smooth-page-transitions-fadeout"
                  ) &&
                    0 < e.isTrigger &&
                    t.addClass("eltdf-slider-is-moving");
                },
                onDragged: function () {
                  eltdf.body.hasClass(
                    "eltdf-smooth-page-transitions-fadeout"
                  ) &&
                    t.hasClass("eltdf-slider-is-moving") &&
                    setTimeout(function () {
                      t.removeClass("eltdf-slider-is-moving");
                    }, 500);
                },
              });
            }),
            x)
          ) {
            a = t.parent().find(".eltdf-slider-thumbnail");
            var A = "";
            switch (parseInt(a.data("thumbnail-count")) % 6) {
              case 2:
                A = "two";
                break;
              case 3:
                A = "three";
                break;
              case 4:
                A = "four";
                break;
              case 5:
                A = "five";
                break;
              case 0:
              default:
                A = "six";
            }
            "" !== A && a.addClass("eltdf-slider-columns-" + A),
              a.find(".eltdf-slider-thumbnail-item").on("click", function () {
                H(this).siblings(".active").removeClass("active"),
                  H(this).addClass("active"),
                  l.trigger("to.owl.carousel", [H(this).index(), r]);
              });
          }
        });
    }
    function g(e) {
      var t = function () {
        eltdf.scroll > e.offset().top - eltdf.windowHeight &&
        eltdf.scroll < e.offset().top + e.height()
          ? e.hasClass("eltdf-in-view") || e.addClass("eltdf-in-view")
          : e.hasClass("eltdf-in-view") && e.removeClass("eltdf-in-view");
      };
      H(window).scroll(function () {
        t();
      }),
        t();
    }
  })(jQuery),
  (function (r) {
    "use strict";
    var e = {};
    function t() {
      f();
    }
    function a() {
      l().init();
    }
    function d() {
      l().scroll();
    }
    function f() {
      var e = r("audio.eltdf-blog-audio");
      e.length && e.mediaelementplayer({ audioWidth: "100%" });
    }
    function l() {
      var e = r(".eltdf-blog-holder"),
        a = function (e) {
          var t =
            e.outerHeight() +
            e.offset().top -
            eltdfGlobalVars.vars.eltdfAddForAdminBar;
          !e.hasClass("eltdf-blog-pagination-infinite-scroll-started") &&
            eltdf.scroll + eltdf.windowHeight > t &&
            d(e);
        },
        d = function (a) {
          var d,
            e,
            l = a.children(".eltdf-blog-holder-inner");
          void 0 !== a.data("max-num-pages") &&
            !1 !== a.data("max-num-pages") &&
            (e = a.data("max-num-pages")),
            a.hasClass("eltdf-blog-pagination-infinite-scroll") &&
              a.addClass("eltdf-blog-pagination-infinite-scroll-started");
          var t = eltdf.modules.common.getLoadMoreData(a),
            n = a.find(".eltdf-blog-pag-loading");
          if ((d = t.nextPage) <= e) {
            n.addClass("eltdf-showing");
            var o = eltdf.modules.common.setLoadMoreAjaxData(
              t,
              "sahel_elated_blog_load_more"
            );
            r.ajax({
              type: "POST",
              data: o,
              url: eltdfGlobalVars.vars.eltdfAjaxUrl,
              success: function (e) {
                d++, a.data("next-page", d);
                var t = r.parseJSON(e).html;
                a.waitForImages(function () {
                  a.hasClass("eltdf-grid-masonry-list")
                    ? (i(l, n, t),
                      eltdf.modules.common.setFixedImageProportionSize(
                        a,
                        a.find("article"),
                        l.find(".eltdf-masonry-grid-sizer").width()
                      ))
                    : s(l, n, t),
                    setTimeout(function () {
                      f(),
                        eltdf.modules.common.eltdfOwlSlider(),
                        eltdf.modules.common.eltdfFluidVideo(),
                        eltdf.modules.common.eltdfInitSelfHostedVideoPlayer(),
                        eltdf.modules.common.eltdfSelfHostedVideoSize(),
                        "function" ==
                          typeof eltdf.modules.common
                            .eltdfStickySidebarWidget &&
                          eltdf.modules.common
                            .eltdfStickySidebarWidget()
                            .reInit(),
                        r(document.body).trigger("blog_list_load_more_trigger");
                    }, 400);
                }),
                  a.hasClass("eltdf-blog-pagination-infinite-scroll-started") &&
                    a.removeClass(
                      "eltdf-blog-pagination-infinite-scroll-started"
                    );
              },
            });
          }
          d === e && a.find(".eltdf-blog-pag-load-more").hide();
        },
        i = function (e, t, a) {
          e
            .append(a)
            .isotope("reloadItems")
            .isotope({ sortBy: "original-order" }),
            t.removeClass("eltdf-showing"),
            setTimeout(function () {
              e.isotope("layout");
            }, 600);
        },
        s = function (e, t, a) {
          t.removeClass("eltdf-showing"), e.append(a);
        };
      return {
        init: function () {
          e.length &&
            e.each(function () {
              var t,
                e = r(this);
              e.hasClass("eltdf-blog-pagination-load-more") &&
                (t = e)
                  .find(".eltdf-blog-pag-load-more a")
                  .on("click", function (e) {
                    e.preventDefault(), e.stopPropagation(), d(t);
                  }),
                e.hasClass("eltdf-blog-pagination-infinite-scroll") && a(e);
            });
        },
        scroll: function () {
          e.length &&
            e.each(function () {
              var e = r(this);
              e.hasClass("eltdf-blog-pagination-infinite-scroll") && a(e);
            });
        },
      };
    }
    ((eltdf.modules.blog = e).eltdfOnDocumentReady = t),
      (e.eltdfOnWindowLoad = a),
      (e.eltdfOnWindowScroll = d),
      r(document).ready(t),
      r(window).load(a),
      r(window).scroll(d);
  })(jQuery),
  (function (l) {
    "use strict";
    var e = {};
    function t() {
      eltdf.window.scroll(function () {
        var e = l(".eltdf-content").height(),
          t = e - 200,
          a = l(this).scrollTop(),
          d = l(this).height();
        n(t < (0 < a ? a + d / 2 : 1) ? "off" : "on");
      });
    }
    function n(e) {
      var t = l(
        ".eltdf-content-side .eltdf-content-side-holder-outer .eltdf-content-side-holder-inner"
      );
      t.removeClass("off on"),
        "on" === e ? t.addClass("on") : t.addClass("off");
    }
    ((eltdf.modules.contentSide = e).eltdfOnDocumentReady = t),
      l(document).ready(t);
  })(jQuery),
  (function (l) {
    "use strict";
    var e = {};
    function t() {
      !(function () {
        if (
          l("body:not(.error404) .eltdf-footer-uncover").length &&
          !eltdf.htmlEl.hasClass("touch")
        ) {
          var e = l("footer"),
            t = e.outerHeight(),
            a = l(".eltdf-content"),
            d = function () {
              a.css("margin-bottom", t), e.css("height", t);
            };
          d(),
            l(window).resize(function () {
              (t = e.find(".eltdf-footer-inner").outerHeight()), d();
            });
        }
      })();
    }
    ((eltdf.modules.footer = e).eltdfOnWindowLoad = t), l(window).load(t);
  })(jQuery),
  (function (s) {
    "use strict";
    var e = {};
    function t() {
      d(),
        (function () {
          var e = s(".eltdf-header-widget-boxed .eltdf-page-header");
          if (e.length) {
            var t = e.find(".eltdf-position-right-inner");
            t.each(function () {
              var e = s(this).children().last();
              e.hasClass("eltdf-main-menu") ||
                e.hasClass("eltdf-fullscreen-outer-holder") ||
                e.wrap('<div class="eltdf-last-widget-wrapper">');
            });
          }
        })(),
        setTimeout(function () {
          s(".eltdf-drop-down > ul > li").each(function () {
            var o = s(this);
            o.find(".second").length &&
              o.waitForImages(function () {
                var e = o.find(".second"),
                  t = eltdf.menuDropdownHeightSet ? 0 : e.outerHeight();
                if (o.hasClass("wide")) {
                  var a = 0,
                    d = e.find("> .inner > ul > li");
                  d.each(function () {
                    var e = s(this).outerHeight();
                    a < e && (a = e);
                  }),
                    d.css("height", "").height(a),
                    eltdf.menuDropdownHeightSet || (t = e.outerHeight());
                }
                if (
                  (eltdf.menuDropdownHeightSet || e.height(0),
                  navigator.userAgent.match(/(iPod|iPhone|iPad)/))
                )
                  o.on("touchstart mouseenter", function () {
                    e.css({
                      height: t,
                      overflow: "visible",
                      visibility: "visible",
                      opacity: "1",
                    });
                  }).on("mouseleave", function () {
                    e.css({
                      height: "0px",
                      overflow: "hidden",
                      visibility: "hidden",
                      opacity: "0",
                    });
                  });
                else if (eltdf.body.hasClass("eltdf-dropdown-animate-height")) {
                  var l = {
                    interval: 0,
                    over: function () {
                      setTimeout(function () {
                        e
                          .addClass("eltdf-drop-down-start")
                          .css({
                            visibility: "visible",
                            height: "0",
                            opacity: "1",
                          }),
                          e
                            .stop()
                            .animate(
                              { height: t },
                              400,
                              "easeInOutQuint",
                              function () {
                                e.css("overflow", "visible");
                              }
                            );
                      }, 100);
                    },
                    timeout: 100,
                    out: function () {
                      e
                        .stop()
                        .animate({ height: "0", opacity: 0 }, 100, function () {
                          e.css({ overflow: "hidden", visibility: "hidden" });
                        }),
                        e.removeClass("eltdf-drop-down-start");
                    },
                  };
                  o.hoverIntent(l);
                } else {
                  var n = {
                    interval: 0,
                    over: function () {
                      setTimeout(function () {
                        e.addClass("eltdf-drop-down-start")
                          .stop()
                          .css({ height: t });
                      }, 150);
                    },
                    timeout: 150,
                    out: function () {
                      e.stop()
                        .css({ height: "0" })
                        .removeClass("eltdf-drop-down-start");
                    },
                  };
                  o.hoverIntent(n);
                }
              });
          }),
            s(".eltdf-drop-down ul li.wide ul li a").on("click", function (e) {
              if (1 === e.which) {
                var t = s(this);
                setTimeout(function () {
                  t.mouseleave();
                }, 500);
              }
            }),
            (eltdf.menuDropdownHeightSet = !0);
        }, 100);
    }
    function a() {
      l();
    }
    function d() {
      var e = s(".eltdf-drop-down > ul > li.narrow.menu-item-has-children");
      e.length &&
        e.each(function (e) {
          var t,
            a = s(this),
            d = a.offset().left,
            l = a.find(".second"),
            n = l.find(".inner ul"),
            o = n.outerWidth(),
            i = eltdf.windowWidth - d;
          eltdf.body.hasClass("eltdf-boxed") &&
            (i =
              eltdf.boxedLayoutWidth -
              (d - (eltdf.windowWidth - eltdf.boxedLayoutWidth) / 2)),
            0 < a.find("li.sub").length && (t = i - o),
            l.removeClass("right"),
            n.removeClass("right"),
            (i < o || t < o) && (l.addClass("right"), n.addClass("right"));
        });
    }
    function l() {
      var e = s(".eltdf-drop-down > ul > li.wide");
      e.length &&
        e.each(function (e) {
          var t = s(this).find(".second");
          if (
            t.length &&
            !t.hasClass("left_position") &&
            !t.hasClass("right_position")
          ) {
            t.css("left", 0);
            var a = t.offset().left;
            if (eltdf.body.hasClass("eltdf-boxed")) {
              var d = s(
                ".eltdf-boxed .eltdf-wrapper .eltdf-wrapper-inner"
              ).outerWidth();
              (a -= (eltdf.windowWidth - d) / 2), t.css({ left: -a, width: d });
            } else
              eltdf.body.hasClass("eltdf-wide-dropdown-menu-in-grid")
                ? t.css({
                    left: -a + (eltdf.windowWidth - eltdf.gridWidth()) / 2,
                    width: eltdf.gridWidth(),
                  })
                : t.css({ left: -a, width: eltdf.windowWidth });
          }
        });
    }
    ((eltdf.modules.header = e).eltdfSetDropDownMenuPosition = d),
      (e.eltdfSetDropDownWideMenuPosition = l),
      (e.eltdfOnDocumentReady = t),
      (e.eltdfOnWindowLoad = a),
      s(document).ready(t),
      s(window).load(a);
  })(jQuery),
  (function (l) {
    "use strict";
    function e() {
      l(document).on("click", ".eltdf-like", function () {
        var e,
          t = l(this),
          a = t.attr("id");
        if (t.hasClass("liked")) return !1;
        void 0 !== t.data("type") && (e = t.data("type"));
        var d = { action: "sahel_elated_like", likes_id: a, type: e };
        return (
          l.post(eltdfGlobalVars.vars.eltdfAjaxUrl, d, function (e) {
            t.html(e).addClass("liked").attr("title", "You already like this!");
          }),
          !1
        );
      });
    }
    l(document).ready(e);
  })(jQuery),
  (function (f) {
    "use strict";
    var e = {};
    function t() {
      !(function () {
        var d,
          l = f(".eltdf-wrapper"),
          n = f(".eltdf-side-menu"),
          o = f("a.eltdf-side-menu-button-opener"),
          i = !1,
          s = !1,
          r = !1;
        eltdf.body.hasClass("eltdf-side-menu-slide-from-right")
          ? (f(".eltdf-cover").remove(),
            (d = "eltdf-right-side-menu-opened"),
            l.prepend('<div class="eltdf-cover"/>'),
            (i = !0))
          : eltdf.body.hasClass("eltdf-side-menu-slide-with-content")
          ? ((d = "eltdf-side-menu-open"), (s = !0))
          : eltdf.body.hasClass("eltdf-side-area-uncovered-from-content") &&
            ((d = "eltdf-right-side-menu-opened"), (r = !0));
        f("a.eltdf-side-menu-button-opener, a.eltdf-close-side-menu").on(
          "click",
          function (e) {
            if ((e.preventDefault(), o.hasClass("opened"))) {
              if ((o.removeClass("opened"), eltdf.body.removeClass(d), r))
                var t = setTimeout(function () {
                  n.css({ visibility: "hidden" }), clearTimeout(t);
                }, 400);
            } else {
              o.addClass("opened"),
                eltdf.body.addClass(d),
                i &&
                  f(".eltdf-wrapper .eltdf-cover").on("click", function () {
                    eltdf.body.removeClass("eltdf-right-side-menu-opened"),
                      o.removeClass("opened");
                  }),
                r && n.css({ visibility: "visible" });
              var a = f(window).scrollTop();
              f(window).scroll(function () {
                if (
                  400 < Math.abs(eltdf.scroll - a) &&
                  (eltdf.body.removeClass(d), o.removeClass("opened"), r)
                )
                  var e = setTimeout(function () {
                    n.css({ visibility: "hidden" }), clearTimeout(e);
                  }, 400);
              });
            }
            s &&
              (e.stopPropagation(),
              l.on("click", function () {
                e.preventDefault(),
                  o.removeClass("opened"),
                  eltdf.body.removeClass("eltdf-side-menu-open");
              }));
          }
        ),
          n.length && eltdf.modules.common.eltdfInitPerfectScrollbar().init(n);
      })();
    }
    ((eltdf.modules.sidearea = e).eltdfOnDocumentReady = t),
      f(document).ready(t);
  })(jQuery),
  (function (i) {
    "use strict";
    var e = {};
    function t() {
      !(function () {
        var e = i(".eltdf-subscribe-popup-holder"),
          t = i(".eltdf-sp-close");
        if (e.length) {
          var a = e.find(".eltdf-sp-prevent"),
            d = "no";
          if (a.length) {
            var l = e.hasClass("eltdf-sp-prevent-cookies"),
              n = a.find(".eltdf-sp-prevent-input"),
              o = n.data("value");
            l
              ? ((d = localStorage.getItem("disabledPopup")),
                sessionStorage.removeItem("disabledPopup"))
              : ((d = sessionStorage.getItem("disabledPopup")),
                localStorage.removeItem("disabledPopup")),
              a.children().on("click", function (e) {
                "yes" !== o
                  ? ((o = "yes"),
                    n.addClass("eltdf-sp-prevent-clicked").data("value", "yes"))
                  : ((o = "no"),
                    n
                      .removeClass("eltdf-sp-prevent-clicked")
                      .data("value", "no")),
                  "yes" === o
                    ? l
                      ? localStorage.setItem("disabledPopup", "yes")
                      : sessionStorage.setItem("disabledPopup", "yes")
                    : l
                    ? localStorage.setItem("disabledPopup", "no")
                    : sessionStorage.setItem("disabledPopup", "no");
              });
          }
          "yes" !== d &&
            (eltdf.body.hasClass("eltdf-sp-opened")
              ? (eltdf.body.removeClass("eltdf-sp-opened"),
                eltdf.modules.common.eltdfEnableScroll())
              : (eltdf.body.addClass("eltdf-sp-opened"),
                eltdf.modules.common.eltdfDisableScroll()),
            t.on("click", function (e) {
              e.preventDefault(),
                eltdf.body.removeClass("eltdf-sp-opened"),
                eltdf.modules.common.eltdfEnableScroll();
            }),
            i(document).keyup(function (e) {
              27 === e.keyCode &&
                (eltdf.body.removeClass("eltdf-sp-opened"),
                eltdf.modules.common.eltdfEnableScroll());
            }));
        }
      })();
    }
    ((eltdf.modules.subscribePopup = e).eltdfOnWindowLoad = t),
      i(window).load(t);
  })(jQuery),
  (function (i) {
    "use strict";
    var e = {};
    function t() {
      !(function () {
        var e = i(".eltdf-title-holder.eltdf-bg-parallax");
        if (0 < e.length && 1024 < eltdf.windowWidth) {
          var t = e.hasClass("eltdf-bg-parallax-zoom-out"),
            a = parseInt(e.data("height")),
            d = parseInt(e.data("background-width")),
            l = (a / 1e4) * 7,
            n = -eltdf.scroll * l,
            o = eltdfGlobalVars.vars.eltdfAddForAdminBar;
          e.css({ "background-position": "center " + (n + o) + "px" }),
            t && t.css({ "background-size": d - eltdf.scroll + "px auto" }),
            i(window).scroll(function () {
              (n = -eltdf.scroll * l),
                e.css({ "background-position": "center " + (n + o) + "px" }),
                t && t.css({ "background-size": d - eltdf.scroll + "px auto" });
            });
        }
      })();
    }
    ((eltdf.modules.title = e).eltdfOnDocumentReady = t), i(document).ready(t);
  })(jQuery),
  (function (s) {
    "use strict";
    var e = {};
    function t() {
      var e;
      s(document).on(
        "click",
        ".eltdf-quantity-minus, .eltdf-quantity-plus",
        function (e) {
          e.stopPropagation();
          var t,
            a = s(this),
            d = a.siblings(".eltdf-quantity-input"),
            l = parseFloat(d.data("step")),
            n = parseFloat(d.data("max")),
            o = !1,
            i = parseFloat(d.val());
          a.hasClass("eltdf-quantity-minus") && (o = !0),
            o
              ? 1 <= (t = i - l)
                ? d.val(t)
                : d.val(0)
              : ((t = i + l),
                void 0 === n ? d.val(t) : n <= t ? d.val(n) : d.val(t)),
            d.trigger("change");
        }
      ),
        (function () {
          var e = s(".woocommerce-ordering .orderby");
          e.length && e.select2({ minimumResultsForSearch: 1 / 0 });
          var t = s(
            ".eltdf-woocommerce-page .eltdf-content .variations td.value select"
          );
          t.length && t.select2();
          var a = s("#calc_shipping_country");
          a.length && a.select2();
          var d = s(".cart-collaterals .shipping select#calc_shipping_state");
          d.length && d.select2();
        })(),
        (e = s(
          ".eltdf-woo-single-page.eltdf-woo-single-has-pretty-photo .images .woocommerce-product-gallery__image"
        )).length &&
          (e
            .children("a")
            .attr("data-rel", "prettyPhoto[woo_single_pretty_photo]"),
          "function" == typeof eltdf.modules.common.eltdfPrettyPhoto &&
            eltdf.modules.common.eltdfPrettyPhoto());
    }
    ((eltdf.modules.woocommerce = e).eltdfOnDocumentReady = t),
      s(document).ready(t);
  })(jQuery),
  (function (h) {
    "use strict";
    var e = {};
    function t() {
      m();
    }
    function a() {
      l().init();
    }
    function d() {
      l().scroll();
    }
    function l() {
      var e = h(".eltdf-blog-list-holder"),
        l = function (e) {
          var t =
            e.outerHeight() +
            e.offset().top -
            eltdfGlobalVars.vars.eltdfAddForAdminBar;
          !e.hasClass("eltdf-bl-pag-infinite-scroll-started") &&
            eltdf.scroll + eltdf.windowHeight > t &&
            n(e);
        },
        n = function (a, e) {
          var d,
            l,
            n = a.find(".eltdf-blog-list");
          void 0 !== a.data("max-num-pages") &&
            !1 !== a.data("max-num-pages") &&
            (l = a.data("max-num-pages")),
            a.hasClass("eltdf-bl-pag-standard-shortcodes") &&
              a.data("next-page", e),
            a.hasClass("eltdf-bl-pag-infinite-scroll") &&
              a.addClass("eltdf-bl-pag-infinite-scroll-started");
          var t = eltdf.modules.common.getLoadMoreData(a),
            o = a.find(".eltdf-blog-pag-loading");
          if ((d = t.nextPage) <= l) {
            a.hasClass("eltdf-bl-pag-standard-shortcodes")
              ? (o.addClass("eltdf-showing eltdf-standard-pag-trigger"),
                a.addClass("eltdf-bl-pag-standard-shortcodes-animate"))
              : o.addClass("eltdf-showing");
            var i = eltdf.modules.common.setLoadMoreAjaxData(
              t,
              "sahel_elated_blog_shortcode_load_more"
            );
            h.ajax({
              type: "POST",
              data: i,
              url: eltdfGlobalVars.vars.eltdfAjaxUrl,
              success: function (e) {
                a.hasClass("eltdf-bl-pag-standard-shortcodes") || d++,
                  a.data("next-page", d);
                var t = h.parseJSON(e).html;
                a.hasClass("eltdf-bl-pag-standard-shortcodes")
                  ? (s(a, l, d),
                    a.waitForImages(function () {
                      a.hasClass("eltdf-bl-masonry")
                        ? r(a, n, o, t)
                        : (f(a, n, o, t),y
                          "function" ==
                            typeof eltdf.modules.common
                              .eltdfStickySidebarWidget &&
                            (eltdf.modules.common
                              .eltdfStickySidebarWidget()
                              .reInit(),
                            m()));
                    }))
                  : a.waitForImages(function () {
                      a.hasClass("eltdf-bl-masonry")
                        ? c(n, o, t)
                        : (u(n, o, t),
                          "function" ==
                            typeof eltdf.modules.common
                              .eltdfStickySidebarWidget &&
                            (eltdf.modules.common
                              .eltdfStickySidebarWidget()
                              .reInit(),
                            m()));
                    }),
                  a.hasClass("eltdf-bl-pag-infinite-scroll-started") &&
                    a.removeClass("eltdf-bl-pag-infinite-scroll-started");
              },
            });
          }
          d === l && a.find(".eltdf-blog-pag-load-more").hide();
        },
        s = function (e, t, a) {
          var d = e.find(".eltdf-bl-standard-pagination"),
            l = d.find("li.eltdf-pag-number"),
            n = d.find("li.eltdf-pag-prev a"),
            o = d.find("li.eltdf-pag-next a");
          l.removeClass("eltdf-pag-active"),
            l.eq(a - 1).addClass("eltdf-pag-active"),
            n.data("paged", a - 1),
            o.data("paged", a + 1),
            1 < a ? n.css({ opacity: "1" }) : n.css({ opacity: "0" }),
            a === t ? o.css({ opacity: "0" }) : o.css({ opacity: "1" });
        },
        r = function (e, t, a, d) {
          t
            .html(d)
            .isotope("reloadItems")
            .isotope({ sortBy: "original-order" }),
            a.removeClass("eltdf-showing eltdf-standard-pag-trigger"),
            e.removeClass("eltdf-bl-pag-standard-shortcodes-animate"),
            setTimeout(function () {
              t.isotope("layout"),
                "function" ==
                  typeof eltdf.modules.common.eltdfStickySidebarWidget &&
                  eltdf.modules.common.eltdfStickySidebarWidget().reInit();
            }, 600);
        },
        f = function (e, t, a, d) {
          a.removeClass("eltdf-showing eltdf-standard-pag-trigger"),
            e.removeClass("eltdf-bl-pag-standard-shortcodes-animate"),
            t.html(d);
        },
        c = function (e, t, a) {
          e
            .append(a)
            .isotope("reloadItems")
            .isotope({ sortBy: "original-order" }),
            t.removeClass("eltdf-showing"),
            setTimeout(function () {
              e.isotope("layout"),
                "function" ==
                  typeof eltdf.modules.common.eltdfStickySidebarWidget &&
                  eltdf.modules.common.eltdfStickySidebarWidget().reInit();
            }, 600);
        },
        u = function (e, t, a) {
          t.removeClass("eltdf-showing"), e.append(a);
        };
      return {
        init: function () {
          e.length &&
            e.each(function () {
              var d,
                e,
                t,
                a = h(this);
              a.hasClass("eltdf-bl-pag-standard-shortcodes") &&
                (e = (d = a).find(".eltdf-bl-standard-pagination li")).length &&
                e.each(function () {
                  var t = h(this).children("a"),
                    a = 1;
                  t.on("click", function (e) {
                    e.preventDefault(),
                      e.stopPropagation(),
                      void 0 !== t.data("paged") &&
                        !1 !== t.data("paged") &&
                        (a = t.data("paged")),
                      n(d, a);
                  });
                }),
                a.hasClass("eltdf-bl-pag-load-more") &&
                  (t = a)
                    .find(".eltdf-blog-pag-load-more a")
                    .on("click", function (e) {
                      e.preventDefault(), e.stopPropagation(), n(t);
                    }),
                a.hasClass("eltdf-bl-pag-infinite-scroll") && l(a);
            });
        },
        scroll: function () {
          e.length &&
            e.each(function () {
              var e = h(this);
              e.hasClass("eltdf-bl-pag-infinite-scroll") && l(e);
            });
        },
      };
    }
    function m() {
      var e = h(
          ".eltdf-bl-with-loading-animation .eltdf-bl-item:not(.eltdf-appeared)"
        ),
        t = function () {
          if (e.length && !eltdf.htmlEl.hasClass("touch")) {
            e.appear(function () {
              var e = h(this),
                t = 100 * Math.floor(6 * Math.random()) + "ms";
              e.addClass("eltdf-appeared").css("transition-delay", t);
            });
          }
        };
      eltdf.body.hasClass("eltdf-smooth-page-transitions-preloader")
        ? h(document).on("eltdfLoaderRemoved", function () {
            t();
          })
        : t();
    }
    ((eltdf.modules.blogListSC = e).eltdfOnDocumentReady = t),
      (e.eltdfOnWindowLoad = a),
      (e.eltdfOnWindowScroll = d),
      h(document).ready(t),
      h(window).load(a),
      h(window).scroll(d);
  })(jQuery),
  (function (f) {
    "use strict";
    var e = {};
    function t() {
      !(function () {
        var t = f("a.eltdf-fullscreen-menu-opener");
        if (t.length) {
          var a,
            e = f(".eltdf-fullscreen-menu-holder-outer"),
            d = (t.parents(".eltdf-fullscreen-outer-holder"), !1),
            l = !1,
            n = f(".eltdf-fullscreen-above-menu-widget-holder"),
            o = f(".eltdf-fullscreen-below-menu-widget-holder"),
            i = f(".eltdf-fullscreen-menu-holder-outer nav > ul > li > a"),
            s = f(".eltdf-fullscreen-menu > ul li.has_sub > a"),
            r = f(".eltdf-fullscreen-menu ul li:not(.has_sub) a");
          eltdf.modules.common.eltdfInitPerfectScrollbar().init(e),
            f(window).resize(function () {
              e.height(eltdf.windowHeight);
            }),
            eltdf.body.hasClass("eltdf-fade-push-text-right")
              ? ((a = "eltdf-push-nav-right"), (d = !0))
              : eltdf.body.hasClass("eltdf-fade-push-text-top") &&
                ((a = "eltdf-push-text-top"), (l = !0)),
            (d || l) &&
              (n.length &&
                n
                  .children()
                  .css({
                    "-webkit-animation-delay": "0ms",
                    "-moz-animation-delay": "0ms",
                    "animation-delay": "0ms",
                  }),
              i.each(function (e) {
                f(this).css({
                  "-webkit-animation-delay": 70 * (e + 1) + "ms",
                  "-moz-animation-delay": 70 * (e + 1) + "ms",
                  "animation-delay": 70 * (e + 1) + "ms",
                });
              }),
              o.length &&
                o
                  .children()
                  .css({
                    "-webkit-animation-delay": 70 * (i.length + 1) + "ms",
                    "-moz-animation-delay": 70 * (i.length + 1) + "ms",
                    "animation-delay": 70 * (i.length + 1) + "ms",
                  })),
            t.on("click", function (e) {
              e.preventDefault(),
                t.hasClass("eltdf-fm-opened")
                  ? (t.removeClass("eltdf-fm-opened"),
                    eltdf.body
                      .removeClass(
                        "eltdf-fullscreen-menu-opened eltdf-fullscreen-fade-in"
                      )
                      .addClass("eltdf-fullscreen-fade-out"),
                    eltdf.body.addClass(a),
                    eltdf.modules.common.eltdfEnableScroll(),
                    f("nav.eltdf-fullscreen-menu ul.sub_menu").slideUp(200))
                  : (t.addClass("eltdf-fm-opened"),
                    eltdf.body
                      .removeClass("eltdf-fullscreen-fade-out")
                      .addClass(
                        "eltdf-fullscreen-menu-opened eltdf-fullscreen-fade-in"
                      ),
                    eltdf.body.removeClass(a),
                    eltdf.modules.common.eltdfDisableScroll(),
                    f(document).keyup(function (e) {
                      27 === e.keyCode &&
                        (t.removeClass("eltdf-fm-opened"),
                        eltdf.body
                          .removeClass(
                            "eltdf-fullscreen-menu-opened eltdf-fullscreen-fade-in"
                          )
                          .addClass("eltdf-fullscreen-fade-out"),
                        eltdf.body.addClass(a),
                        eltdf.modules.common.eltdfEnableScroll(),
                        f("nav.eltdf-fullscreen-menu ul.sub_menu").slideUp(
                          200
                        ));
                    }));
            }),
            s.on("tap click", function (e) {
              e.preventDefault();
              var t = f(this),
                a = t.parent(),
                d = a.siblings(".menu-item-has-children");
              if (a.hasClass("has_sub")) {
                var l = a.find("> ul.sub_menu");
                l.is(":visible")
                  ? (l.slideUp(450, "easeInOutQuint"),
                    a.removeClass("open_sub"))
                  : (a.addClass("open_sub"),
                    0 === d.length
                      ? l.slideDown(400, "easeInOutQuint")
                      : (a
                          .closest("li.menu-item")
                          .siblings()
                          .find(".menu-item")
                          .removeClass("open_sub"),
                        a
                          .siblings()
                          .removeClass("open_sub")
                          .find(".sub_menu")
                          .slideUp(400, "easeInOutQuint", function () {
                            l.slideDown(400, "easeInOutQuint");
                          })));
              }
              return !1;
            }),
            r.on("click", function (e) {
              if (
                "http://#" === f(this).attr("href") ||
                "#" === f(this).attr("href")
              )
                return !1;
              1 === e.which &&
                (t.removeClass("eltdf-fm-opened"),
                eltdf.body.removeClass("eltdf-fullscreen-menu-opened"),
                eltdf.body
                  .removeClass("eltdf-fullscreen-fade-in")
                  .addClass("eltdf-fullscreen-fade-out"),
                eltdf.body.addClass(a),
                f("nav.eltdf-fullscreen-menu ul.sub_menu").slideUp(200),
                eltdf.modules.common.eltdfEnableScroll());
            });
        }
      })();
    }
    ((eltdf.modules.headerMinimal = e).eltdfOnDocumentReady = t),
      f(document).ready(t);
  })(jQuery),
  (function (o) {
    "use strict";
    var e = {};
    function t() {
      a().init();
    }
    ((eltdf.modules.headerVertical = e).eltdfOnDocumentReady = t),
      o(document).ready(t);
    var a = function () {
      var t = o(".eltdf-vertical-menu-area"),
        a = function () {
          t.hasClass("eltdf-with-scroll") &&
            eltdf.modules.common.eltdfInitPerfectScrollbar().init(t);
        };
      return {
        init: function () {
          var d, l, n, e;
          t.length &&
            ((e = t.find(".eltdf-vertical-menu")).hasClass(
              "eltdf-vertical-dropdown-below"
            )
              ? (n = e.find("ul li.menu-item-has-children")).each(function () {
                  var t = o(this).find(" > .second, > ul"),
                    a = this,
                    d = o(this).find("> a"),
                    l = "fast";
                  d.on("click tap", function (e) {
                    e.preventDefault(),
                      e.stopPropagation(),
                      t.is(":visible")
                        ? (o(a).removeClass("open"), t.slideUp(l))
                        : (d.parent().parent().children().hasClass("open") &&
                          d
                            .parent()
                            .parent()
                            .parent()
                            .hasClass("eltdf-vertical-menu")
                            ? (o(this)
                                .parent()
                                .parent()
                                .children()
                                .removeClass("open"),
                              o(this)
                                .parent()
                                .parent()
                                .children()
                                .find(" > .second")
                                .slideUp(l))
                            : (o(this).parents("li").hasClass("open") ||
                                (n.removeClass("open"),
                                n.find(" > .second, > ul").slideUp(l)),
                              o(this)
                                .parent()
                                .parent()
                                .children()
                                .hasClass("open") &&
                                (o(this)
                                  .parent()
                                  .parent()
                                  .children()
                                  .removeClass("open"),
                                o(this)
                                  .parent()
                                  .parent()
                                  .children()
                                  .find(" > .second, > ul")
                                  .slideUp(l))),
                          o(a).addClass("open"),
                          t.slideDown("slow"));
                  });
                })
              : e.hasClass("eltdf-vertical-dropdown-side") &&
                ((d = e.find("ul li.menu-item-has-children")),
                (l = d.find(" > .second > .inner > ul, > ul")),
                d.each(function () {
                  var t = o(this).find(" > .second > .inner > ul, > ul"),
                    a = this;
                  if (Modernizr.touch) {
                    var e = o(this).find("> a");
                    e.on("click tap", function (e) {
                      e.preventDefault(),
                        e.stopPropagation(),
                        t.hasClass("eltdf-float-open")
                          ? (t.removeClass("eltdf-float-open"),
                            o(a).removeClass("open"))
                          : (o(this).parents("li").hasClass("open") ||
                              (d.removeClass("open"),
                              l.removeClass("eltdf-float-open")),
                            t.addClass("eltdf-float-open"),
                            o(a).addClass("open"));
                    });
                  } else
                    o(this).hoverIntent({
                      over: function () {
                        t.addClass("eltdf-float-open"), o(a).addClass("open");
                      },
                      out: function () {
                        t.removeClass("eltdf-float-open"),
                          o(a).removeClass("open");
                      },
                      timeout: 300,
                    });
                })),
            a());
        },
      };
    };
  })(jQuery),
  (function (o) {
    "use strict";
    var e = {};
    function t() {
      !(function () {
        var t = o(".eltdf-mobile-header .eltdf-mobile-menu-opener"),
          a = o(".eltdf-mobile-header .eltdf-mobile-nav"),
          e = o(
            ".eltdf-mobile-nav .mobile_arrow, .eltdf-mobile-nav h6, .eltdf-mobile-nav a.eltdf-mobile-no-link"
          );
        t.length &&
          a.length &&
          t.on("tap click", function (e) {
            e.stopPropagation(),
              e.preventDefault(),
              a.is(":visible")
                ? (a.slideUp(450, "easeInOutQuint"),
                  t.removeClass("eltdf-mobile-menu-opened"))
                : (a.slideDown(450, "easeInOutQuint"),
                  t.addClass("eltdf-mobile-menu-opened"));
          });
        e.length &&
          e.each(function () {
            var l = o(this);
            l.on("tap click", function (e) {
              var t = l.parent("li"),
                a = t.siblings(".menu-item-has-children");
              if (t.hasClass("has_sub")) {
                var d = t.find("> ul.sub_menu");
                d.is(":visible")
                  ? (d.slideUp(450, "easeInOutQuint"),
                    t.removeClass("eltdf-opened"))
                  : (t.addClass("eltdf-opened"),
                    0 === a.length
                      ? t
                          .find(".sub_menu")
                          .slideUp(400, "easeInOutQuint", function () {
                            d.slideDown(400, "easeInOutQuint");
                          })
                      : t
                          .siblings()
                          .removeClass("eltdf-opened")
                          .find(".sub_menu")
                          .slideUp(400, "easeInOutQuint", function () {
                            d.slideDown(400, "easeInOutQuint");
                          }));
              }
            });
          });
        o(".eltdf-mobile-nav a, .eltdf-mobile-logo-wrapper a").on(
          "click tap",
          function (e) {
            "http://#" !== o(this).attr("href") &&
              "#" !== o(this).attr("href") &&
              (a.slideUp(450, "easeInOutQuint"),
              t.removeClass("eltdf-mobile-menu-opened"));
          }
        );
      })(),
        d(),
        (function () {
          var t = o(".eltdf-mobile-header"),
            a = t.find(".eltdf-mobile-menu-opener"),
            e = t.length ? t.outerHeight() : 0;
          eltdf.body.hasClass("eltdf-content-is-behind-header") &&
            0 < e &&
            eltdf.windowWidth <= 1024 &&
            o(".eltdf-content").css("marginTop", -e);
          if (eltdf.body.hasClass("eltdf-sticky-up-mobile-header")) {
            var d,
              l = o("#wpadminbar"),
              n = o(document).scrollTop();
            (d = e + eltdfGlobalVars.vars.eltdfAddForAdminBar),
              o(window).scroll(function () {
                var e = o(document).scrollTop();
                d < e
                  ? t.addClass("eltdf-animate-mobile-header")
                  : t.removeClass("eltdf-animate-mobile-header"),
                  (n < e && d < e && !a.hasClass("eltdf-mobile-menu-opened")) ||
                  e < d
                    ? (t.removeClass("mobile-header-appear"),
                      t.css("margin-bottom", 0),
                      l.length &&
                        t.find(".eltdf-mobile-header-inner").css("top", 0))
                    : (t.addClass("mobile-header-appear"),
                      t.css("margin-bottom", d)),
                  (n = o(document).scrollTop());
              });
          }
        })();
    }
    function a() {
      d();
    }
    function d() {
      if (eltdf.windowWidth <= 1024) {
        var e = o(".eltdf-mobile-header"),
          t = e.length ? e.height() : 0,
          a = e.find(".eltdf-mobile-nav"),
          d = a.outerHeight(),
          l = eltdf.windowHeight - 100,
          n = l < t + d ? l - t : d;
        a.length &&
          (a.height(n),
          eltdf.modules.common.eltdfInitPerfectScrollbar().init(a));
      }
    }
    ((eltdf.modules.mobileHeader = e).eltdfOnDocumentReady = t),
      (e.eltdfOnWindowResize = a),
      o(document).ready(t),
      o(window).resize(a);
  })(jQuery),
  (function (c) {
    "use strict";
    var e = {};
    function t() {
      1024 < eltdf.windowWidth &&
        (function () {
          var t,
            e,
            a = c(".eltdf-page-header"),
            d = c(".eltdf-sticky-header"),
            l = c(".eltdf-fixed-wrapper"),
            n = l.children(".eltdf-menu-area").outerHeight(),
            o = c(".eltdf-slider"),
            i = o.length ? o.outerHeight() : 0,
            s = l.length
              ? l.offset().top - eltdfGlobalVars.vars.eltdfAddForAdminBar
              : 0;
          switch (!0) {
            case eltdf.body.hasClass("eltdf-sticky-header-on-scroll-up"):
              eltdf.modules.stickyHeader.behaviour =
                "eltdf-sticky-header-on-scroll-up";
              var r = c(document).scrollTop();
              (t =
                parseInt(eltdfGlobalVars.vars.eltdfTopBarHeight) +
                parseInt(eltdfGlobalVars.vars.eltdfLogoAreaHeight) +
                parseInt(eltdfGlobalVars.vars.eltdfMenuAreaHeight) +
                parseInt(eltdfGlobalVars.vars.eltdfStickyHeaderHeight)),
                (e = function () {
                  var e = c(document).scrollTop();
                  (r < e && t < e) || e < t
                    ? ((eltdf.modules.stickyHeader.isStickyVisible = !1),
                      d
                        .removeClass("header-appear")
                        .find(".eltdf-main-menu .second")
                        .removeClass("eltdf-drop-down-start"),
                      eltdf.body.removeClass("eltdf-sticky-header-appear"))
                    : ((eltdf.modules.stickyHeader.isStickyVisible = !0),
                      d.addClass("header-appear"),
                      eltdf.body.addClass("eltdf-sticky-header-appear")),
                    (r = c(document).scrollTop());
                })(),
                c(window).scroll(function () {
                  e();
                });
              break;
            case eltdf.body.hasClass("eltdf-sticky-header-on-scroll-down-up"):
              (eltdf.modules.stickyHeader.behaviour =
                "eltdf-sticky-header-on-scroll-down-up"),
                0 !== eltdfPerPageVars.vars.eltdfStickyScrollAmount
                  ? (eltdf.modules.stickyHeader.stickyAppearAmount = parseInt(
                      eltdfPerPageVars.vars.eltdfStickyScrollAmount
                    ))
                  : (eltdf.modules.stickyHeader.stickyAppearAmount =
                      parseInt(eltdfGlobalVars.vars.eltdfTopBarHeight) +
                      parseInt(eltdfGlobalVars.vars.eltdfLogoAreaHeight) +
                      parseInt(eltdfGlobalVars.vars.eltdfMenuAreaHeight) +
                      parseInt(i)),
                (e = function () {
                  eltdf.scroll < eltdf.modules.stickyHeader.stickyAppearAmount
                    ? ((eltdf.modules.stickyHeader.isStickyVisible = !1),
                      d
                        .removeClass("header-appear")
                        .find(".eltdf-main-menu .second")
                        .removeClass("eltdf-drop-down-start"),
                      eltdf.body.removeClass("eltdf-sticky-header-appear"))
                    : ((eltdf.modules.stickyHeader.isStickyVisible = !0),
                      d.addClass("header-appear"),
                      eltdf.body.addClass("eltdf-sticky-header-appear"));
                })(),
                c(window).scroll(function () {
                  e();
                });
              break;
            case eltdf.body.hasClass("eltdf-fixed-on-scroll"):
              eltdf.modules.stickyHeader.behaviour = "eltdf-fixed-on-scroll";
              var f = function () {
                eltdf.scroll <= s
                  ? (l.removeClass("fixed"),
                    eltdf.body.removeClass("eltdf-fixed-header-appear"),
                    a.css("margin-bottom", "0"))
                  : (l.addClass("fixed"),
                    eltdf.body.addClass("eltdf-fixed-header-appear"),
                    a.css("margin-bottom", n + "px"));
              };
              f(),
                c(window).scroll(function () {
                  f();
                });
          }
        })();
    }
    ((eltdf.modules.stickyHeader = e).isStickyVisible = !1),
      (e.stickyAppearAmount = 0),
      (e.behaviour = ""),
      (e.eltdfOnDocumentReady = t),
      c(document).ready(t);
  })(jQuery),
  (function (u) {
    "use strict";
    var e = {};
    function t() {
      !(function () {
        if (eltdf.body.hasClass("eltdf-search-covers-header")) {
          var e = u("a.eltdf-search-opener");
          0 < e.length &&
            e.each(function () {
              var e = u(this);
              e.on("click", function (e) {
                e.preventDefault();
                var t,
                  a = u(this),
                  d = u(".eltdf-page-header"),
                  l = u(".eltdf-top-bar"),
                  n = d.find(".eltdf-fixed-wrapper.fixed"),
                  o = u(".eltdf-mobile-header"),
                  i = u(".eltdf-search-cover"),
                  s = !!a.parents(".eltdf-top-bar").length,
                  r = !!a.parents(".eltdf-fixed-wrapper.fixed").length,
                  f = !!a.parents(".eltdf-sticky-header").length,
                  c = !!a.parents(".eltdf-mobile-header").length;
                i.removeClass("eltdf-is-active"),
                  s
                    ? ((t = l.outerHeight()),
                      d
                        .children(".eltdf-search-cover")
                        .addClass("eltdf-is-active eltdf-opener-in-top-header"))
                    : r
                    ? ((t = n.outerHeight()),
                      d
                        .children(".eltdf-search-cover")
                        .addClass("eltdf-is-active"))
                    : f
                    ? ((t = d.find(".eltdf-sticky-header").outerHeight()),
                      d
                        .children(".eltdf-search-cover")
                        .addClass("eltdf-is-active"))
                    : c
                    ? ((t = o.hasClass("mobile-header-appear")
                        ? o.children(".eltdf-mobile-header-inner").outerHeight()
                        : o.outerHeight()),
                      o.find(".eltdf-search-cover").addClass("eltdf-is-active"))
                    : ((t = d.outerHeight()),
                      d
                        .children(".eltdf-search-cover")
                        .addClass("eltdf-is-active")),
                  i.hasClass("eltdf-is-active") &&
                    i
                      .height(t)
                      .stop(!0)
                      .fadeIn(600)
                      .find('input[type="text"]')
                      .focus(),
                  i.find(".eltdf-search-close").on("click", function (e) {
                    e.preventDefault(),
                      i.stop(!0).fadeOut(450, function () {
                        i.hasClass("eltdf-opener-in-top-header") &&
                          i.removeClass("eltdf-opener-in-top-header");
                      }),
                      i.removeClass("eltdf-is-active");
                  }),
                  i.blur(function () {
                    i.stop(!0).fadeOut(450, function () {
                      i.hasClass("eltdf-opener-in-top-header") &&
                        i.removeClass("eltdf-opener-in-top-header");
                    }),
                      i.removeClass("eltdf-is-active");
                  }),
                  u(window).scroll(function () {
                    i.stop(!0).fadeOut(450, function () {
                      i.hasClass("eltdf-opener-in-top-header") &&
                        i.removeClass("eltdf-opener-in-top-header");
                    }),
                      i.removeClass("eltdf-is-active");
                  });
              });
            });
        }
      })();
    }
    ((eltdf.modules.searchCoversHeader = e).eltdfOnDocumentReady = t),
      u(document).ready(t);
  })(jQuery),
  (function (n) {
    "use strict";
    var e = {};
    function t() {
      !(function () {
        if (eltdf.body.hasClass("eltdf-fullscreen-search")) {
          var e = n("a.eltdf-search-opener");
          if (0 < e.length) {
            var a = n(".eltdf-fullscreen-search-holder"),
              t = n(".eltdf-search-close");
            e.on("click", function (e) {
              e.preventDefault(),
                a.hasClass("eltdf-animate")
                  ? (eltdf.body.removeClass(
                      "eltdf-fullscreen-search-opened eltdf-search-fade-out"
                    ),
                    eltdf.body.removeClass("eltdf-search-fade-in"),
                    a.removeClass("eltdf-animate"),
                    setTimeout(function () {
                      a.find(".eltdf-search-field").val(""),
                        a.find(".eltdf-search-field").blur();
                    }, 300),
                    eltdf.modules.common.eltdfEnableScroll())
                  : (eltdf.body.addClass(
                      "eltdf-fullscreen-search-opened eltdf-search-fade-in"
                    ),
                    eltdf.body.removeClass("eltdf-search-fade-out"),
                    a.addClass("eltdf-animate"),
                    setTimeout(function () {
                      a.find(".eltdf-search-field").focus();
                    }, 900),
                    eltdf.modules.common.eltdfDisableScroll()),
                t.on("click", function (e) {
                  e.preventDefault(),
                    eltdf.body.removeClass(
                      "eltdf-fullscreen-search-opened eltdf-search-fade-in"
                    ),
                    eltdf.body.addClass("eltdf-search-fade-out"),
                    a.removeClass("eltdf-animate"),
                    setTimeout(function () {
                      a.find(".eltdf-search-field").val(""),
                        a.find(".eltdf-search-field").blur();
                    }, 300),
                    eltdf.modules.common.eltdfEnableScroll();
                }),
                n(document).mouseup(function (e) {
                  var t = n(".eltdf-form-holder-inner");
                  t.is(e.target) ||
                    0 !== t.has(e.target).length ||
                    (e.preventDefault(),
                    eltdf.body.removeClass(
                      "eltdf-fullscreen-search-opened eltdf-search-fade-in"
                    ),
                    eltdf.body.addClass("eltdf-search-fade-out"),
                    a.removeClass("eltdf-animate"),
                    setTimeout(function () {
                      a.find(".eltdf-search-field").val(""),
                        a.find(".eltdf-search-field").blur();
                    }, 300),
                    eltdf.modules.common.eltdfEnableScroll());
                }),
                n(document).keyup(function (e) {
                  27 === e.keyCode &&
                    (eltdf.body.removeClass(
                      "eltdf-fullscreen-search-opened eltdf-search-fade-in"
                    ),
                    eltdf.body.addClass("eltdf-search-fade-out"),
                    a.removeClass("eltdf-animate"),
                    setTimeout(function () {
                      a.find(".eltdf-search-field").val(""),
                        a.find(".eltdf-search-field").blur();
                    }, 300),
                    eltdf.modules.common.eltdfEnableScroll());
                });
            });
            var d = n(".eltdf-fullscreen-search-holder .eltdf-search-field"),
              l = n(
                ".eltdf-fullscreen-search-holder .eltdf-field-holder .eltdf-line"
              );
            d.focus(function () {
              l.css("width", "100%");
            }),
              d.blur(function () {
                l.css("width", "0");
              });
          }
        }
      })();
    }
    ((eltdf.modules.searchFullscreen = e).eltdfOnDocumentReady = t),
      n(document).ready(t);
  })(jQuery),
  (function (l) {
    "use strict";
    var e = {};
    function t() {
      eltdf.window.scroll(function () {
        var e = l(".eltdf-content").height(),
          t = e - 100,
          a = l(this).scrollTop(),
          d = l(this).height();
        n(t < (0 < a ? a + d / 2 : 1) ? "off" : "on");
      });
    }
    function n(e) {
      var t = l(".eltdf-blog-single-nav-label");
      t.removeClass("off on"),
        "on" === e ? t.addClass("on") : t.addClass("off");
    }
    ((eltdf.modules.single = e).eltdfOnDocumentReady = t), l(document).ready(t);
  })(jQuery),
  (function (s) {
    "use strict";
    var e = {};
    function t() {
      var e;
      d().init(),
        (e = s(".eltdf-featured-projects-widget")).length &&
          e.each(function () {
            var e = s(this),
              t = e.find(".eltdf-featured-project-opener"),
              a = e.find(".eltdf-featured-project-holder"),
              d = a.find(".eltdf-featured-project-close");
            t.on("click", function () {
              e.hasClass("eltdf-opened") ||
                (e
                  .removeClass("eltdf-fp-fade-out")
                  .addClass("eltdf-opened eltdf-fp-fade-in"),
                eltdf.body.addClass("eltdf-fp-opened"),
                eltdf.modules.common.eltdfDisableScroll());
            }),
              d.on("click", function () {
                e.hasClass("eltdf-opened") &&
                  (e
                    .removeClass("eltdf-opened eltdf-fp-fade-in")
                    .addClass("eltdf-fp-fade-out"),
                  eltdf.body.removeClass("eltdf-fp-opened"),
                  eltdf.modules.common.eltdfEnableScroll());
              });
          });
    }
    function a() {
      eltdf.window.scroll(function () {
        var e = s(".eltdf-content").height(),
          t = e - 100,
          a = s(this).scrollTop(),
          d = s(this).height();
        l(t < (0 < a ? a + d / 2 : 1) ? "off" : "on");
      });
    }
    ((eltdf.modules.portfolio = e).eltdfOnWindowLoad = t),
      (e.eltdfOnDocumentReady = a),
      s(window).load(t),
      s(document).ready(a);
    var d = function () {
      var t = s(
        ".eltdf-follow-portfolio-info .eltdf-portfolio-single-holder .eltdf-ps-info-sticky-holder"
      );
      if (t.length)
        var e = t.parent(),
          a = e.offset().top,
          d = e.height(),
          l = s(".eltdf-ps-image-holder").height(),
          n = s(".header-appear, .eltdf-fixed-wrapper"),
          o = n.length ? n.height() : 0,
          i = 30;
      return {
        init: function () {
          !(function () {
            if (
              t.length &&
              d <= l &&
              eltdf.scroll >=
                a - o - eltdfGlobalVars.vars.eltdfAddForAdminBar - i
            ) {
              var e =
                eltdf.scroll -
                a +
                eltdfGlobalVars.vars.eltdfAddForAdminBar +
                o +
                i;
              l < e + d && (e = l - d + i), t.stop().animate({ marginTop: e });
            }
          })(),
            s(window).scroll(function () {
              !(function () {
                if (t.length && d <= l) {
                  0 < eltdf.scroll && n.length && (o = n.height());
                  var e = o + eltdfGlobalVars.vars.eltdfAddForAdminBar + i;
                  eltdf.scroll >= a - e
                    ? eltdf.scroll + d + e + 2 * i < a + l
                      ? (t
                          .stop()
                          .animate({ marginTop: eltdf.scroll - a + e + 2 * i }),
                        (o = 0))
                      : t.stop().animate({ marginTop: l - d })
                    : t.stop().animate({ marginTop: 0 });
                }
              })();
            });
        },
      };
    };
    function l(e) {
      var t = s(".eltdf-ps-navigation-floated a");
      t.removeClass("off on"),
        "on" === e ? t.addClass("on") : t.addClass("off");
    }
  })(jQuery),
  (function (l) {
    "use strict";
    var e = {};
    function t() {
      a();
    }
    function a() {
      var e = l(".eltdf-accordion-holder");
      e.length &&
        e.each(function () {
          var e = l(this);
          if (
            (e.hasClass("eltdf-accordion") &&
              e.accordion({
                animate: "swing",
                collapsible: !0,
                active: 0,
                icons: "",
                heightStyle: "content",
              }),
            e.hasClass("eltdf-toggle"))
          ) {
            var t = l(this),
              a = t.find(".eltdf-accordion-title"),
              d = a.next();
            t.addClass(
              "accordion ui-accordion ui-accordion-icons ui-widget ui-helper-reset"
            ),
              a.addClass(
                "ui-accordion-header ui-state-default ui-corner-top ui-corner-bottom"
              ),
              d
                .addClass(
                  "ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom"
                )
                .hide(),
              a.each(function () {
                var e = l(this);
                e.hover(function () {
                  e.toggleClass("ui-state-hover");
                }),
                  e.on("click", function () {
                    e.toggleClass(
                      "ui-accordion-header-active ui-state-active ui-state-default ui-corner-bottom"
                    ),
                      e
                        .next()
                        .toggleClass("ui-accordion-content-active")
                        .slideToggle(400);
                  });
              });
          }
        });
    }
    ((eltdf.modules.accordions = e).eltdfInitAccordions = a),
      (e.eltdfOnDocumentReady = t),
      l(document).ready(t);
  })(jQuery),
  (function (l) {
    "use strict";
    var e = {};
    function t() {
      a();
    }
    function a() {
      var a,
        d,
        e = l(
          ".eltdf-grow-in, .eltdf-fade-in-up,  .eltdf-fade-in-down, .eltdf-element-from-fade, .eltdf-element-from-left, .eltdf-element-from-right, .eltdf-element-from-top, .eltdf-element-from-bottom, .eltdf-flip-in, .eltdf-x-rotate, .eltdf-z-rotate, .eltdf-y-translate, .eltdf-fade-in, .eltdf-fade-in-left-x-rotate"
        );
      e.length &&
        e.each(function () {
          var t = l(this);
          t.appear(
            function () {
              if (
                ((a = t.data("animation")),
                (d = parseInt(t.data("animation-delay"))),
                void 0 !== a && "" !== a)
              ) {
                var e = a + "-on";
                setTimeout(function () {
                  t.addClass(e);
                }, d);
              }
            },
            { accX: 0, accY: eltdfGlobalVars.vars.eltdfElementAppearAmount }
          );
        });
    }
    ((eltdf.modules.animationHolder = e).eltdfInitAnimationHolder = a),
      (e.eltdfOnDocumentReady = t),
      l(document).ready(t);
  })(jQuery),
  (function (t) {
    "use strict";
    var e = {};
    function a() {
      d().init();
    }
    ((eltdf.modules.button = e).eltdfButton = d),
      (e.eltdfOnDocumentReady = a),
      t(document).ready(a);
    var d = function () {
      var e = t(".eltdf-btn");
      return {
        init: function () {
          e.length &&
            e.each(function () {
              !(function (e) {
                if (void 0 !== e.data("hover-color")) {
                  var t = function (e) {
                      e.data.button.css("color", e.data.color);
                    },
                    a = e.css("color"),
                    d = e.data("hover-color");
                  e.on("mouseenter", { button: e, color: d }, t),
                    e.on("mouseleave", { button: e, color: a }, t);
                }
              })(t(this)),
                (function (e) {
                  if (void 0 !== e.data("hover-bg-color")) {
                    var t = function (e) {
                        e.data.button.css("background-color", e.data.color);
                      },
                      a = e.css("background-color"),
                      d = e.data("hover-bg-color");
                    e.on("mouseenter", { button: e, color: d }, t),
                      e.on("mouseleave", { button: e, color: a }, t);
                  }
                })(t(this)),
                (function (e) {
                  if (void 0 !== e.data("hover-border-color")) {
                    var t = function (e) {
                        e.data.button.css("border-color", e.data.color);
                      },
                      a = e.css("borderTopColor"),
                      d = e.data("hover-border-color");
                    e.on("mouseenter", { button: e, color: d }, t),
                      e.on("mouseleave", { button: e, color: a }, t);
                  }
                })(t(this));
            });
        },
      };
    };
  })(jQuery),
  (function (g) {
    "use strict";
    var e = {};
    function t() {
      a();
    }
    function a() {
      var l,
        n,
        o,
        i,
        s,
        r,
        f,
        c,
        u,
        h,
        m,
        e = g(".eltdf-countdown"),
        p = new Date().getMonth();
      e.length &&
        e.each(function () {
          var e,
            t,
            a = g(this).attr("id"),
            d = g("#" + a);
          (l = d.data("year")),
            (n = d.data("month")),
            (o = d.data("day")),
            (i = d.data("hour")),
            (s = d.data("minute")),
            (r = d.data("timezone")),
            (f = d.data("month-label")),
            (c = d.data("day-label")),
            (u = d.data("hour-label")),
            (h = d.data("minute-label")),
            (m = d.data("second-label")),
            (e = d.data("digit-size")),
            (t = d.data("label-size")),
            p !== n && (n -= 1),
            d.countdown({
              until: new Date(l, n, o, i, s, 44),
              labels: ["", f, "", c, u, h, m],
              format: "ODHMS",
              timezone: r,
              padZeroes: !0,
              onTick: function () {
                d
                  .find(".countdown-amount")
                  .css({ "font-size": e + "px", "line-height": e + "px" }),
                  d.find(".countdown-period").css({ "font-size": t + "px" });
              },
            });
        });
    }
    ((eltdf.modules.countdown = e).eltdfInitCountdown = a),
      (e.eltdfOnDocumentReady = t),
      g(document).ready(t);
  })(jQuery),
  (function (d) {
    "use strict";
    var e = {};
    function t() {
      a();
    }
    function a() {
      var e = d(".eltdf-counter-holder");
      e.length &&
        e.each(function () {
          var t = d(this),
            a = t.find(".eltdf-counter");
          t.appear(
            function () {
              if ((t.css("opacity", "1"), a.hasClass("eltdf-zero-counter"))) {
                var e = parseFloat(a.text());
                a.countTo({
                  from: 0,
                  to: e,
                  speed: 1500,
                  refreshInterval: 100,
                });
              } else a.absoluteCounter({ speed: 2e3, fadeInDelay: 1e3 });
            },
            { accX: 0, accY: eltdfGlobalVars.vars.eltdfElementAppearAmount }
          );
        });
    }
    ((eltdf.modules.counter = e).eltdfInitCounter = a),
      (e.eltdfOnDocumentReady = t),
      d(document).ready(t);
  })(jQuery),
  (function (s) {
    "use strict";
    var e = {};
    function t() {
      d();
    }
    function a() {
      l();
    }
    function d() {
      var e = s(".eltdf-custom-font-holder");
      e.length &&
        e.each(function () {
          var e = s(this),
            t = "",
            a = "",
            d = "",
            l = "",
            n = "",
            o = "",
            i = "";
          void 0 !== e.data("item-class") &&
            !1 !== e.data("item-class") &&
            (t = e.data("item-class")),
            void 0 !== e.data("font-size-1366") &&
              !1 !== e.data("font-size-1366") &&
              (a += "font-size: " + e.data("font-size-1366") + " !important;"),
            void 0 !== e.data("font-size-1024") &&
              !1 !== e.data("font-size-1024") &&
              (d += "font-size: " + e.data("font-size-1024") + " !important;"),
            void 0 !== e.data("font-size-768") &&
              !1 !== e.data("font-size-768") &&
              (l += "font-size: " + e.data("font-size-768") + " !important;"),
            void 0 !== e.data("font-size-680") &&
              !1 !== e.data("font-size-680") &&
              (n += "font-size: " + e.data("font-size-680") + " !important;"),
            void 0 !== e.data("line-height-1366") &&
              !1 !== e.data("line-height-1366") &&
              (a +=
                "line-height: " + e.data("line-height-1366") + " !important;"),
            void 0 !== e.data("line-height-1024") &&
              !1 !== e.data("line-height-1024") &&
              (d +=
                "line-height: " + e.data("line-height-1024") + " !important;"),
            void 0 !== e.data("line-height-768") &&
              !1 !== e.data("line-height-768") &&
              (l +=
                "line-height: " + e.data("line-height-768") + " !important;"),
            void 0 !== e.data("line-height-680") &&
              !1 !== e.data("line-height-680") &&
              (n +=
                "line-height: " + e.data("line-height-680") + " !important;"),
            (a.length || d.length || l.length || n.length) &&
              (a.length &&
                (i +=
                  "@media only screen and (max-width: 1366px) {.eltdf-custom-font-holder." +
                  t +
                  " { " +
                  a +
                  " } }"),
              d.length &&
                (i +=
                  "@media only screen and (max-width: 1024px) {.eltdf-custom-font-holder." +
                  t +
                  " { " +
                  d +
                  " } }"),
              l.length &&
                (i +=
                  "@media only screen and (max-width: 768px) {.eltdf-custom-font-holder." +
                  t +
                  " { " +
                  l +
                  " } }"),
              n.length &&
                (i +=
                  "@media only screen and (max-width: 680px) {.eltdf-custom-font-holder." +
                  t +
                  " { " +
                  n +
                  " } }")),
            i.length && (o = '<style type="text/css">' + i + "</style>"),
            o.length && s("head").append(o);
        });
    }
    function l() {
      var e = s(".eltdf-cf-typed");
      e.length &&
        e.each(function () {
          var e = s(this),
            t = e
              .parent(".eltdf-cf-typed-wrap")
              .parent(".eltdf-custom-font-holder"),
            a = [],
            d = e.find(".eltdf-cf-typed-1").text(),
            l = e.find(".eltdf-cf-typed-2").text(),
            n = e.find(".eltdf-cf-typed-3").text(),
            o = e.find(".eltdf-cf-typed-4").text();
          d.length && a.push(d),
            l.length && a.push(l),
            n.length && a.push(n),
            o.length && a.push(o),
            t.appear(
              function () {
                e.typed({
                  strings: a,
                  typeSpeed: 90,
                  backDelay: 700,
                  loop: !0,
                  contentType: "text",
                  loopCount: !1,
                  cursorChar: "_",
                });
              },
              { accX: 0, accY: eltdfGlobalVars.vars.eltdfElementAppearAmount }
            );
        });
    }
    ((eltdf.modules.customFont = e).eltdfCustomFontResize = d),
      (e.eltdfCustomFontTypeOut = l),
      (e.eltdfOnDocumentReady = t),
      (e.eltdfOnWindowLoad = a),
      s(document).ready(t),
      s(window).load(a);
  })(jQuery),
  (function (r) {
    "use strict";
    var e = {};
    function t() {
      a();
    }
    function a() {
      var e = r(".eltdf-elements-holder");
      e.length &&
        e.each(function () {
          var e = r(this).children(".eltdf-eh-item"),
            t = "",
            s = "";
          e.each(function () {
            var e = r(this),
              t = "",
              a = "",
              d = "",
              l = "",
              n = "",
              o = "";
            if (
              (void 0 !== e.data("item-class") &&
                !1 !== e.data("item-class") &&
                (t = e.data("item-class")),
              void 0 !== e.data("1367-1600") &&
                !1 !== e.data("1367-1600") &&
                (a = e.data("1367-1600")),
              void 0 !== e.data("1025-1366") &&
                !1 !== e.data("1025-1366") &&
                (d = e.data("1025-1366")),
              void 0 !== e.data("769-1024") &&
                !1 !== e.data("769-1024") &&
                (l = e.data("769-1024")),
              void 0 !== e.data("681-768") &&
                !1 !== e.data("681-768") &&
                (n = e.data("681-768")),
              void 0 !== e.data("680") &&
                !1 !== e.data("680") &&
                (o = e.data("680")),
              (a.length ||
                d.length ||
                l.length ||
                n.length ||
                o.length ||
                "".length) &&
                (a.length &&
                  (s +=
                    "@media only screen and (min-width: 1367px) and (max-width: 1600px) {.eltdf-eh-item-content." +
                    t +
                    " { padding: " +
                    a +
                    " !important; } }"),
                d.length &&
                  (s +=
                    "@media only screen and (min-width: 1025px) and (max-width: 1366px) {.eltdf-eh-item-content." +
                    t +
                    " { padding: " +
                    d +
                    " !important; } }"),
                l.length &&
                  (s +=
                    "@media only screen and (min-width: 769px) and (max-width: 1024px) {.eltdf-eh-item-content." +
                    t +
                    " { padding: " +
                    l +
                    " !important; } }"),
                n.length &&
                  (s +=
                    "@media only screen and (min-width: 681px) and (max-width: 768px) {.eltdf-eh-item-content." +
                    t +
                    " { padding: " +
                    n +
                    " !important; } }"),
                o.length &&
                  (s +=
                    "@media only screen and (max-width: 680px) {.eltdf-eh-item-content." +
                    t +
                    " { padding: " +
                    o +
                    " !important; } }")),
              "function" == typeof eltdf.modules.common.eltdfOwlSlider)
            ) {
              var i = e.find(".eltdf-owl-slider");
              i.length &&
                setTimeout(function () {
                  i.trigger("refresh.owl.carousel");
                }, 100);
            }
          }),
            s.length && (t = '<style type="text/css">' + s + "</style>"),
            t.length && r("head").append(t);
        });
    }
    ((eltdf.modules.elementsHolder = e).eltdfInitElementsHolderResponsiveStyle =
      a),
      (e.eltdfOnDocumentReady = t),
      r(document).ready(t);
  })(jQuery),
  (function (r) {
    "use strict";
    var e = {};
    function t() {
      a();
    }
    function a() {
      var e = r(".eltdf-expanding-carousel-holder");
      e.length &&
        e.each(function () {
          var d = r(this),
            l = d.find(".eltdf-esc-item"),
            t = l.find(".eltdf-esc-item-title-holder").first(),
            a = d.find(".eltdf-esc-item-image"),
            n = d.find(".eltdf-esc-nav"),
            e = d.find(".eltdf-esc-prev-trigger, .eltdf-esc-nav-prev"),
            o = d.find(".eltdf-esc-next-trigger, .eltdf-esc-nav-next"),
            i = function () {
              if (d.hasClass("eltdf-expanding-fullscreen")) {
                var e = eltdf.windowHeight - d.offset().top;
                if (eltdf.body.hasClass("eltdf-paspartu-enabled"))
                  e -= parseInt(r(".eltdf-wrapper").css("padding-top"));
                d.css("height", e);
              }
              a.each(function () {
                r(this).width(d.width());
              }),
                n.css("bottom", t.outerHeight());
            },
            s = function (e) {
              var t, a;
              d.addClass("eltdf-animating"),
                (t = e
                  ? l.filter(".eltdf-active").data("index") < l.length
                    ? l.filter(".eltdf-active").next().data("index") - 1
                    : 0
                  : 1 < l.filter(".eltdf-active").data("index")
                  ? l.filter(".eltdf-active").prev().data("index") - 1
                  : l.length - 1),
                l.find("> div").removeAttr("style"),
                l.removeClass("eltdf-remove"),
                l.filter(".eltdf-active").addClass("eltdf-remove"),
                l.removeClass("eltdf-active"),
                l.eq(t).addClass("eltdf-active"),
                (a = t),
                setTimeout(function () {
                  d.removeClass("eltdf-animating"),
                    l.removeClass("eltdf-peek-prev"),
                    l.removeClass("eltdf-peek-next"),
                    l.removeClass("eltdf-prev"),
                    l.removeClass("eltdf-next"),
                    a < l.length - 1 && 0 < a
                      ? (l
                          .filter(".eltdf-active")
                          .next()
                          .addClass("eltdf-next"),
                        l.filter(".eltdf-active").prev().addClass("eltdf-prev"))
                      : 0 == a
                      ? (l
                          .filter(".eltdf-active")
                          .next()
                          .addClass("eltdf-next"),
                        l.last().addClass("eltdf-prev"))
                      : (l.first().addClass("eltdf-next"),
                        l
                          .filter(".eltdf-active")
                          .prev()
                          .addClass("eltdf-prev")),
                    setTimeout(function () {
                      l.removeClass("eltdf-remove");
                    }, 200);
                }, 700);
            };
          d.waitForImages(function () {
            i(),
              l
                .first()
                .addClass("eltdf-active")
                .find("> div")
                .css("transition", "none"),
              eltdf.body.hasClass("eltdf-smooth-page-transitions-preloader")
                ? r(document).on("eltdfLoaderRemoved", function () {
                    d.css("opacity", 1);
                  })
                : d.css("opacity", 1),
              setTimeout(function () {
                l.filter(".eltdf-active").next().addClass("eltdf-next"),
                  l.last().addClass("eltdf-prev");
              }, 200),
              o.on("click", function (e) {
                d.hasClass("eltdf-animating") || s(!0);
              }),
              o
                .on("mouseenter", function () {
                  d.addClass("eltdf-peek-next");
                })
                .on("mouseleave", function () {
                  d.removeClass("eltdf-peek-next");
                }),
              e.on("click", function (e) {
                d.hasClass("eltdf-animating") || s(!1);
              }),
              e
                .on("mouseenter", function () {
                  d.addClass("eltdf-peek-prev");
                })
                .on("mouseleave", function () {
                  d.removeClass("eltdf-peek-prev");
                }),
              d.hasClass("eltdf-esc-slide-on-scroll") &&
                !eltdf.htmlEl.hasClass("touch") &&
                (d.mousewheel(function (e) {
                  e.preventDefault(),
                    d.hasClass("eltdf-animating") ||
                      (-1 == (e.deltaY < 0 ? -1 : 1) && s());
                }),
                d.on("wheel", function () {
                  return !1;
                }));
          }),
            r(window).resize(function () {
              i();
            });
        });
    }
    ((eltdf.modules.expandingCarousel = e).eltdfInitexpandingCarousel = a),
      (e.eltdfOnDocumentReady = t),
      r(document).ready(t);
  })(jQuery),
  (function (i) {
    "use strict";
    var e = {};
    function t() {
      var e;
      (e = i(".eltdf-fsis-slider")).length &&
        e.each(function () {
          var t = i(this),
            e = t.parent(),
            a = e.children(".eltdf-fsis-prev-nav"),
            d = e.children(".eltdf-fsis-next-nav"),
            l = e.children(".eltdf-fsis-slider-mask");
          e.addClass("eltdf-fsis-is-init"),
            n(t),
            o(t, a, d, -1),
            t.on("drag.owl.carousel", function () {
              setTimeout(function () {
                l.hasClass("eltdf-drag") ||
                  e.hasClass("eltdf-fsis-active") ||
                  l.addClass("eltdf-drag");
              }, 200);
            }),
            t.on("dragged.owl.carousel", function () {
              setTimeout(function () {
                l.hasClass("eltdf-drag") && l.removeClass("eltdf-drag");
              }, 300);
            }),
            t.on("translate.owl.carousel", function (e) {
              o(t, a, d, e.item.index);
            }),
            t.on("translated.owl.carousel", function () {
              n(t),
                setTimeout(function () {
                  l.removeClass("eltdf-drag");
                }, 300);
            });
        });
    }
    function n(t) {
      var e,
        a = t.find(".owl-item.active");
      if (
        (t
          .find(".eltdf-fsis-item")
          .removeClass("eltdf-fsis-content-image-init"),
        (e = t.find(".eltdf-fsis-item")).length &&
          e.removeClass("eltdf-fsis-active-image"),
        a.length)
      ) {
        var d = a.find(".eltdf-fsis-item"),
          l = d.children(".eltdf-fsis-image");
        setTimeout(function () {
          d.addClass("eltdf-fsis-content-image-init");
        }, 100),
          l
            .off()
            .on("mouseenter", function () {
              d.addClass("eltdf-fsis-image-hover");
            })
            .on("mouseleave", function () {
              d.removeClass("eltdf-fsis-image-hover");
            })
            .on("click", function () {
              d.hasClass("eltdf-fsis-active-image")
                ? (t.trigger("play.owl.autoplay"),
                  t.parent().removeClass("eltdf-fsis-active"),
                  d.removeClass("eltdf-fsis-active-image"))
                : (t.trigger("stop.owl.autoplay"),
                  t.parent().addClass("eltdf-fsis-active"),
                  d.addClass("eltdf-fsis-active-image"));
            }),
          i(document).keyup(function (e) {
            27 === e.keyCode &&
              (t.trigger("play.owl.autoplay"),
              t.parent().removeClass("eltdf-fsis-active"),
              d.removeClass("eltdf-fsis-active-image"));
          });
      }
    }
    function o(e, t, a, d) {
      var l = -1 === d ? e.find(".owl-item.active") : i(e.find(".owl-item")[d]),
        n = l.prev().find(".eltdf-fsis-image").css("background-image"),
        o = l.next().find(".eltdf-fsis-image").css("background-image");
      n.length && t.css({ "background-image": n }),
        o.length && a.css({ "background-image": o });
    }
    ((eltdf.modules.fullScreenImageSlider = e).eltdfOnWindowLoad = t),
      i(window).load(t);
  })(jQuery),
  (function (c) {
    "use strict";
    var e = {};
    function t() {
      a();
    }
    function a() {
      var e = c(".eltdf-full-screen-sections");
      e.length &&
        e.each(function () {
          var d = c(this),
            e = d.children(".eltdf-fss-wrapper"),
            l = e.children(".eltdf-fss-item"),
            n = l.length,
            o = l.hasClass("eltdf-fss-item-has-style"),
            t = !1,
            a = "",
            i = "",
            s = "";
          eltdf.body.hasClass("eltdf-light-header")
            ? (s = "light")
            : eltdf.body.hasClass("eltdf-dark-header") && (s = "dark"),
            void 0 !== d.data("enable-continuous-vertical") &&
              !1 !== d.data("enable-continuous-vertical") &&
              "yes" === d.data("enable-continuous-vertical") &&
              (t = !0),
            void 0 !== d.data("enable-navigation") &&
              !1 !== d.data("enable-navigation") &&
              (a = d.data("enable-navigation")),
            void 0 !== d.data("enable-pagination") &&
              !1 !== d.data("enable-pagination") &&
              (i = d.data("enable-pagination"));
          var r = "no" !== a,
            f = "no" !== i;
          e.fullpage({
            sectionSelector: ".eltdf-fss-item",
            scrollingSpeed: 1200,
            verticalCentered: !1,
            continuousVertical: t,
            navigation: f,
            onLeave: function (e, t, a) {
              o && u(c(l[t - 1]).data("header-style"), s), r && h(d, n, t);
            },
            afterRender: function () {
              o && u(l.first().data("header-style"), s),
                r &&
                  (h(d, n, 1),
                  d
                    .children(".eltdf-fss-nav-holder")
                    .css("visibility", "visible")),
                e.css("visibility", "visible");
            },
          }),
            (function (e) {
              var t = e.find(".eltdf-fss-item"),
                o = "",
                a = "";
              t.each(function () {
                var e = c(this),
                  t = "",
                  a = "",
                  d = "",
                  l = "",
                  n = "";
                void 0 !== e.data("item-class") &&
                  !1 !== e.data("item-class") &&
                  (t = e.data("item-class")),
                  void 0 !== e.data("laptop-image") &&
                    !1 !== e.data("laptop-image") &&
                    (a = e.data("laptop-image")),
                  void 0 !== e.data("tablet-image") &&
                    !1 !== e.data("tablet-image") &&
                    (d = e.data("tablet-image")),
                  void 0 !== e.data("tablet-portrait-image") &&
                    !1 !== e.data("tablet-portrait-image") &&
                    (l = e.data("tablet-portrait-image")),
                  void 0 !== e.data("mobile-image") &&
                    !1 !== e.data("mobile-image") &&
                    (n = e.data("mobile-image")),
                  (a.length || d.length || l.length || n.length) &&
                    (a.length &&
                      (o +=
                        "@media only screen and (max-width: 1366px) {.eltdf-fss-item." +
                        t +
                        " { background-image: url(" +
                        a +
                        ") !important; } }"),
                    d.length &&
                      (o +=
                        "@media only screen and (max-width: 1024px) {.eltdf-fss-item." +
                        t +
                        " { background-image: url( " +
                        d +
                        ") !important; } }"),
                    l.length &&
                      (o +=
                        "@media only screen and (max-width: 800px) {.eltdf-fss-item." +
                        t +
                        " { background-image: url( " +
                        l +
                        ") !important; } }"),
                    n.length &&
                      (o +=
                        "@media only screen and (max-width: 680px) {.eltdf-fss-item." +
                        t +
                        " { background-image: url( " +
                        n +
                        ") !important; } }"));
              }),
                o.length && (a = '<style type="text/css">' + o + "</style>");
              a.length && c("head").append(a);
            })(d),
            r &&
              (d.find("#eltdf-fss-nav-up").on("click", function () {
                return c.fn.fullpage.moveSectionUp(), !1;
              }),
              d.find("#eltdf-fss-nav-down").on("click", function () {
                return c.fn.fullpage.moveSectionDown(), !1;
              }));
        });
    }
    function u(e, t) {
      void 0 !== e && "" !== e
        ? eltdf.body
            .removeClass("eltdf-light-header eltdf-dark-header")
            .addClass("eltdf-" + e + "-header")
        : "" !== t
        ? eltdf.body
            .removeClass("eltdf-light-header eltdf-dark-header")
            .addClass("eltdf-" + t + "-header")
        : eltdf.body.removeClass("eltdf-light-header eltdf-dark-header");
    }
    function h(e, t, a) {
      var d = e,
        l = d.find("#eltdf-fss-nav-up"),
        n = d.find("#eltdf-fss-nav-down"),
        o = !1;
      void 0 !== e.data("enable-continuous-vertical") &&
        !1 !== e.data("enable-continuous-vertical") &&
        "yes" === e.data("enable-continuous-vertical") &&
        (o = !0),
        1 !== a || o
          ? a !== t || o
            ? (l.css({ opacity: "1", height: "auto", visibility: "visible" }),
              n.css({ opacity: "1", height: "auto", visibility: "visible" }))
            : (n.css({ opacity: "0", height: "0", visibility: "hidden" }),
              2 === t &&
                l.css({ opacity: "1", height: "auto", visibility: "visible" }))
          : (l.css({ opacity: "0", height: "0", visibility: "hidden" }),
            n.css({ opacity: "0", height: "0", visibility: "hidden" }),
            a !== t &&
              n.css({ opacity: "1", height: "auto", visibility: "visible" }));
    }
    ((eltdf.modules.fullScreenSections = e).eltdfInitFullScreenSections = a),
      (e.eltdfOnDocumentReady = t),
      c(document).ready(t);
  })(jQuery),
  (function (p) {
    "use strict";
    var e = {};
    function t() {
      a();
    }
    function a() {
      var e = p(".eltdf-google-map");
      e.length &&
        e.each(function () {
          var e,
            t,
            a,
            d,
            l,
            n,
            o,
            i,
            s,
            r,
            f = p(this),
            c = !1,
            u = "";
          if (
            void 0 !== f.data("snazzy-map-style") &&
            "yes" === f.data("snazzy-map-style")
          ) {
            c = !0;
            var h = f.parent().find(".eltdf-snazzy-map"),
              m = h.val();
            h.length &&
              m.length &&
              (u = JSON.parse(
                m
                  .replace(/`{`/g, "[")
                  .replace(/`}`/g, "]")
                  .replace(/``/g, '"')
                  .replace(/`/g, "")
              ));
          }
          void 0 !== f.data("custom-map-style") &&
            (e = f.data("custom-map-style")),
            void 0 !== f.data("color-overlay") &&
              !1 !== f.data("color-overlay") &&
              (t = f.data("color-overlay")),
            void 0 !== f.data("saturation") &&
              !1 !== f.data("saturation") &&
              (a = f.data("saturation")),
            void 0 !== f.data("lightness") &&
              !1 !== f.data("lightness") &&
              (d = f.data("lightness")),
            void 0 !== f.data("zoom") &&
              !1 !== f.data("zoom") &&
              (l = f.data("zoom")),
            void 0 !== f.data("pin") &&
              !1 !== f.data("pin") &&
              (n = f.data("pin")),
            void 0 !== f.data("height") &&
              !1 !== f.data("height") &&
              (o = f.data("height")),
            void 0 !== f.data("unique-id") &&
              !1 !== f.data("unique-id") &&
              (i = f.data("unique-id")),
            void 0 !== f.data("scroll-wheel") && (s = f.data("scroll-wheel")),
            void 0 !== f.data("addresses") &&
              !1 !== f.data("addresses") &&
              (r = f.data("addresses")),
            (function (e, t, a, d, l, n, o, i, s, r, f, c, u, h) {
              if ("object" != typeof google) return;
              var m,
                p = [];
              p =
                e && t.length
                  ? t
                  : [
                      {
                        stylers: [
                          { hue: d },
                          { saturation: l },
                          { lightness: n },
                          { gamma: 1 },
                        ],
                      },
                    ];
              m =
                e || "yes" === a
                  ? "eltdf-style"
                  : google.maps.MapTypeId.ROADMAP;
              o = "yes" === o;
              var g = new google.maps.StyledMapType(p, { name: "Google Map" });
              u = new google.maps.Geocoder();
              var v = new google.maps.LatLng(-34.397, 150.644);
              isNaN(r) || (r += "px");
              var y,
                b = {
                  zoom: i,
                  scrollwheel: o,
                  center: v,
                  zoomControl: !0,
                  zoomControlOptions: {
                    style: google.maps.ZoomControlStyle.SMALL,
                    position: google.maps.ControlPosition.RIGHT_CENTER,
                  },
                  scaleControl: !1,
                  scaleControlOptions: {
                    position: google.maps.ControlPosition.LEFT_CENTER,
                  },
                  streetViewControl: !1,
                  streetViewControlOptions: {
                    position: google.maps.ControlPosition.LEFT_CENTER,
                  },
                  panControl: !1,
                  panControlOptions: {
                    position: google.maps.ControlPosition.LEFT_CENTER,
                  },
                  mapTypeControl: !1,
                  mapTypeControlOptions: {
                    mapTypeIds: [google.maps.MapTypeId.ROADMAP, "eltdf-style"],
                    style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                    position: google.maps.ControlPosition.LEFT_CENTER,
                  },
                  mapTypeId: m,
                };
              for (
                (c = new google.maps.Map(
                  document.getElementById(s),
                  b
                )).mapTypes.set("eltdf-style", g),
                  y = 0;
                y < h.length;
                ++y
              )
                w(h[y], f, c, u);
              document.getElementById(s).style.height = r;
            })(
              c,
              u,
              e,
              t,
              a,
              d,
              s,
              l,
              "eltdf-map-" + i,
              o,
              n,
              "map_" + i,
              "geocoder_" + i,
              r
            );
        });
    }
    function w(d, l, n, e) {
      if ("" !== d) {
        var t =
            '<div id="content"><div id="siteNotice"></div><div id="bodyContent"><p>' +
            d +
            "</p></div></div>",
          o = new google.maps.InfoWindow({ content: t });
        e.geocode({ address: d }, function (e, t) {
          if (t === google.maps.GeocoderStatus.OK) {
            n.setCenter(e[0].geometry.location);
            var a = new google.maps.Marker({
              map: n,
              position: e[0].geometry.location,
              icon: l,
              title: d.store_title,
            });
            google.maps.event.addListener(a, "click", function () {
              o.open(n, a);
            }),
              google.maps.event.addDomListener(window, "resize", function () {
                n.setCenter(e[0].geometry.location);
              });
          }
        });
      }
    }
    ((eltdf.modules.googleMap = e).eltdfShowGoogleMap = a),
      (e.eltdfOnDocumentReady = t),
      p(document).ready(t);
  })(jQuery),
  (function (t) {
    "use strict";
    var e = {};
    function a() {
      d().init();
    }
    ((eltdf.modules.icon = e).eltdfIcon = d),
      (e.eltdfOnDocumentReady = a),
      t(document).ready(a);
    var d = function () {
      var e = t(".eltdf-icon-shortcode");
      return {
        init: function () {
          e.length &&
            e.each(function () {
              var e;
              (e = t(this)).hasClass("eltdf-icon-animation") &&
                e.appear(
                  function () {
                    e.parent(".eltdf-icon-animation-holder").addClass(
                      "eltdf-icon-animation-show"
                    );
                  },
                  {
                    accX: 0,
                    accY: eltdfGlobalVars.vars.eltdfElementAppearAmount,
                  }
                ),
                (function (e) {
                  if (void 0 !== e.data("hover-color")) {
                    var t = function (e) {
                        e.data.icon.css("color", e.data.color);
                      },
                      a = e.find(".eltdf-icon-element"),
                      d = e.data("hover-color"),
                      l = a.css("color");
                    "" !== d &&
                      (e.on("mouseenter", { icon: a, color: d }, t),
                      e.on("mouseleave", { icon: a, color: l }, t));
                  }
                })(t(this)),
                (function (e) {
                  if (void 0 !== e.data("hover-background-color")) {
                    var t = function (e) {
                        e.data.icon.css("background-color", e.data.color);
                      },
                      a = e.data("hover-background-color"),
                      d = e.css("background-color");
                    "" !== a &&
                      (e.on("mouseenter", { icon: e, color: a }, t),
                      e.on("mouseleave", { icon: e, color: d }, t));
                  }
                })(t(this)),
                (function (e) {
                  if (void 0 !== e.data("hover-border-color")) {
                    var t = function (e) {
                        e.data.icon.css("border-color", e.data.color);
                      },
                      a = e.data("hover-border-color"),
                      d = e.css("borderTopColor");
                    "" !== a &&
                      (e.on("mouseenter", { icon: e, color: a }, t),
                      e.on("mouseleave", { icon: e, color: d }, t));
                  }
                })(t(this));
            });
        },
      };
    };
  })(jQuery),
  (function (t) {
    "use strict";
    var e = {};
    function a() {
      d().init();
    }
    ((eltdf.modules.iconListItem = e).eltdfInitIconList = d),
      (e.eltdfOnDocumentReady = a),
      t(document).ready(a);
    var d = function () {
      var e = t(".eltdf-animate-list");
      return {
        init: function () {
          e.length &&
            e.each(function () {
              var e;
              (e = t(this)),
                setTimeout(function () {
                  e.appear(
                    function () {
                      e.addClass("eltdf-appeared");
                    },
                    {
                      accX: 0,
                      accY: eltdfGlobalVars.vars.eltdfElementAppearAmount,
                    }
                  );
                }, 30);
            });
        },
      };
    };
  })(jQuery),
  (function (t) {
    "use strict";
    var e = {};
    function a() {
      d();
    }
    function d() {
      var e = t(".eltdf-ih-with-animation");
      e.length &&
        !eltdf.htmlEl.hasClass("touch") &&
        e.appear(function () {
          t(this).addClass("eltdf-appeared");
        });
    }
    ((eltdf.modules.imageHighlight = e).eltdfIHAppear = d),
      (e.eltdfOnDocumentReady = a),
      t(document).ready(a);
  })(jQuery),
  (function (n) {
    "use strict";
    var e = {};
    function t() {
      a();
    }
    function a() {
      var e = n(".eltdf-ils-holder");
      e.length &&
        e.each(function () {
          var a = n(this),
            d = a.find(".eltdf-ils-item-image"),
            l = a.find(".eltdf-ils-item-link");
          d.eq(0).addClass("eltdf-active"),
            a
              .find('.eltdf-ils-item-link[data-index="0"]')
              .addClass("eltdf-active"),
            l.children().on("touchstart mouseenter", function () {
              var e = n(this).parent(),
                t = parseInt(e.data("index"), 10);
              d.removeClass("eltdf-active").eq(t).addClass("eltdf-active"),
                l.removeClass("eltdf-active"),
                a
                  .find('.eltdf-ils-item-link[data-index="' + t + '"]')
                  .addClass("eltdf-active");
            });
        });
    }
    ((eltdf.modules.interactiveLinkShowcase =
      e).eltdfInitInteractiveLinkShowcase = a),
      (e.eltdfOnDocumentReady = t),
      n(document).ready(t);
  })(jQuery),
  (function (t) {
    "use strict";
    var e = {};
    function a() {
      d();
    }
    function d() {
      var e = t(".eltdf-pie-chart-holder");
      e.length &&
        e.each(function () {
          var a = t(this),
            d = a.children(".eltdf-pc-percentage"),
            l = "#000",
            n = "#f7f7f7",
            o = 176;
          void 0 !== d.data("size") &&
            "" !== d.data("size") &&
            (o = d.data("size")),
            void 0 !== d.data("bar-color") &&
              "" !== d.data("bar-color") &&
              (l = d.data("bar-color")),
            void 0 !== d.data("track-color") &&
              "" !== d.data("track-color") &&
              (n = d.data("track-color")),
            d.appear(
              function () {
                var e, t;
                (e = d.find(".eltdf-pc-percent")),
                  (t = parseFloat(e.text())),
                  e.countTo({
                    from: 0,
                    to: t,
                    speed: 1500,
                    refreshInterval: 50,
                  }),
                  a.css("opacity", "1"),
                  d.easyPieChart({
                    barColor: l,
                    trackColor: n,
                    scaleColor: !1,
                    lineCap: "butt",
                    lineWidth: 1,
                    animate: 1500,
                    size: o,
                  });
              },
              { accX: 0, accY: eltdfGlobalVars.vars.eltdfElementAppearAmount }
            );
        });
    }
    ((eltdf.modules.pieChart = e).eltdfInitPieChart = d),
      (e.eltdfOnDocumentReady = a),
      t(document).ready(a);
  })(jQuery),
  (function (t) {
    "use strict";
    var e = {};
    function a() {
      d();
    }
    function d() {
      var e = t(".eltdf-process-holder");
      e.length &&
        e.each(function () {
          var e = t(this);
          e.appear(
            function () {
              e.addClass("eltdf-process-appeared");
            },
            { accX: 0, accY: eltdfGlobalVars.vars.eltdfElementAppearAmount }
          );
        });
    }
    ((eltdf.modules.process = e).eltdfInitProcess = d),
      (e.eltdfOnDocumentReady = a),
      t(document).ready(a);
  })(jQuery),
  (function (o) {
    "use strict";
    var e = {};
    function t() {
      a();
    }
    function a() {
      var e = o(".eltdf-progress-bar");
      e.length &&
        e.each(function () {
          var a = o(this),
            d = a.find(".eltdf-pb-content"),
            l = a.find(".eltdf-pb-percent"),
            n = d.data("percentage");
          a.appear(function () {
            var e, t;
            (e = l),
              (t = parseFloat(n)),
              e.length &&
                e.each(function () {
                  var e = o(this);
                  e.css("opacity", "1"),
                    e.countTo({
                      from: 0,
                      to: t,
                      speed: 2e3,
                      refreshInterval: 50,
                    });
                }),
              d.css("width", "0%").animate({ width: n + "%" }, 2e3),
              a.hasClass("eltdf-pb-percent-floating") &&
                l.css("left", "0%").animate({ left: n + "%" }, 2e3);
          });
        });
    }
    ((eltdf.modules.progressBar = e).eltdfInitProgressBars = a),
      (e.eltdfOnDocumentReady = t),
      o(document).ready(t);
  })(jQuery),
  (function (m) {
    "use strict";
    var e = {};
    function t() {
      a();
    }
    function a() {
      var e = m(".eltdf-scrolling-image-holder");
      if (e.length) {
        var h = function (e, t) {
          var a = (e.prop("naturalWidth") / e.prop("naturalHeight")).toFixed(2);
          e.height(0.944 * t.height()), e.width(0.944 * t.height() * a);
        };
        e.each(function () {
          var e,
            t,
            a,
            d,
            l = m(this),
            n = l.find(".eltdf-scrolling-image"),
            o = l.find(".eltdf-si-frame"),
            i = l.hasClass("eltdf-scrolling-vertical");
          if (i)
            var s = n.height(),
              r = o.height(),
              f = Math.round(s / r);
          else {
            m(window).on("resize", function () {
              h(n, o);
            }),
              setTimeout(function () {
                h(n, o);
              }, 600);
            var c = n.width(),
              u = o.width();
            f = Math.round(c / u);
          }
          n.parent().delay(600).animate({ opacity: 1 }, 300),
            1 < f &&
              ((e = l),
              (t = n),
              (a = o),
              (d = f),
              i
                ? e.on("mouseenter", function () {
                    t.css({
                      transform:
                        "translate3d(0px, -" +
                        Math.round(t.height() - 0.944 * a.height()) +
                        "px, 0px)",
                      transition: "transform " + 2 * d + "s linear",
                    });
                  })
                : e.on("mouseenter", function () {
                    t.css({
                      transform:
                        "translate3d(-" +
                        Math.round(t.width() - a.width()) +
                        "px, 0px, 0px)",
                      transition: "transform " + 2 * d + "s linear",
                    });
                  }),
              e.on("mouseleave", function () {
                t.css({
                  transform: "translate3d(0px, 0px, 0px)",
                  transition:
                    "transform 3s cubic-bezier(0.215, 0.61, 0.355, 1)",
                });
              }));
        });
      }
    }
    ((eltdf.modules.scrollingImage = e).eltdfInitScrollingImage = a),
      (e.eltdfOnWindowLoad = t),
      m(window).on("load", t);
  })(jQuery),
  (function (n) {
    "use strict";
    var e = {};
    function t() {
      var e;
      (e = n(".eltdf-sig-image-holder")).length &&
        e.each(function () {
          var a = n(this),
            e = !1,
            t = !1,
            d = a;
          void 0 !== d.data("slider-animate-in") &&
            !1 !== d.data("slider-animate-in") &&
            (e = d.data("slider-animate-in")),
            void 0 !== d.data("slider-animate-out") &&
              !1 !== d.data("slider-animate-out") &&
              (t = d.data("slider-animate-out"));
          var l = n(".eltdf-sig-thumbnails-holder");
          l.find(".eltdf-sig-thumbnail").on("click", function () {
            a.trigger("to.owl.carousel", [n(this).index(), 700]);
          }),
            a.waitForImages(function () {
              n(this).owlCarousel({
                items: 1,
                loop: !1,
                autoplay: !0,
                autoplayHoverPause: !1,
                autoplayTimeout: 3500,
                smartSpeed: 700,
                margin: 0,
                stagePadding: 0,
                center: !1,
                autoWidth: !1,
                animateIn: e,
                animateOut: t,
                dots: !0,
                dotsContainer: l,
                nav: !1,
                drag: !0,
                callbacks: !0,
                navText: [
                  '<span class="eltdf-prev-icon fa fa-chevron-left"></span>',
                  '<span class="eltdf-next-icon fa fa-chevron-right"></span>',
                ],
                onInitialize: function () {
                  a.css("visibility", "visible");
                },
                onDrag: function (e) {
                  if (
                    eltdf.body.hasClass("eltdf-smooth-page-transitions-fadeout")
                  ) {
                    var t = 0 < e.isTrigger;
                    t && a.addClass("eltdf-slider-is-moving");
                  }
                },
                onDragged: function () {
                  eltdf.body.hasClass(
                    "eltdf-smooth-page-transitions-fadeout"
                  ) &&
                    a.hasClass("eltdf-slider-is-moving") &&
                    setTimeout(function () {
                      a.removeClass("eltdf-slider-is-moving");
                    }, 500);
                },
              });
            });
        });
    }
    ((eltdf.modules.swappingImageGallery = e).eltdfOnWindowLoad = t),
      n(window).load(t);
  })(jQuery),
  (function (n) {
    "use strict";
    var e = {};
    function t() {
      a();
    }
    function a() {
      var e = n(".eltdf-tabs");
      e.length &&
        e.each(function () {
          var e = n(this);
          e.children(".eltdf-tab-container").each(function (e) {
            e += 1;
            var t = n(this),
              a = t.attr("id"),
              d = t.parent().find(".eltdf-tabs-nav li:nth-child(" + e + ") a"),
              l = d.attr("href");
            -1 < (a = "#" + a).indexOf(l) && d.attr("href", a);
          }),
            e.tabs(),
            n(".eltdf-tabs a.eltdf-external-link").unbind("click");
        });
    }
    ((eltdf.modules.tabs = e).eltdfInitTabs = a),
      (e.eltdfOnDocumentReady = t),
      n(document).ready(t);
  })(jQuery),
  (function (a) {
    "use strict";
    var e = {};
    function t() {
      d();
    }
    function d() {
      var e = a(".eltdf-team-with-loading-animation");
      if (e.length && !eltdf.htmlEl.hasClass("touch")) {
        e.appear(function () {
          var e = a(this),
            t = 100 * Math.floor(6 * Math.random()) + "ms";
          e.addClass("eltdf-appeared").css("transition-delay", t);
        });
      }
    }
    ((eltdf.modules.team = e).eltdfInitTeamFX = d),
      (e.eltdfOnDocumentReady = t),
      a(document).ready(t);
  })(jQuery),
  (function (s) {
    "use strict";
    var e = {};
    function t() {
      d(), a();
    }
    function a() {
      var e = s(".eltdf-text-marquee");
      e.length &&
        e.each(function () {
          var t = s(this),
            e = t.find(".eltdf-marquee-element"),
            n = e.filter(".eltdf-original-text"),
            o = e.filter(".eltdf-aux-text"),
            i = function (e) {
              return t.outerWidth() > e.outerWidth()
                ? t.outerWidth()
                : e.outerWidth();
            };
          !(function () {
            window.requestNextAnimationFrame = (function () {
              var a = void 0,
                d = void 0,
                e = navigator.userAgent,
                t = 0,
                l = this;
              return (
                window.webkitRequestAnimationFrame &&
                  ((d = function (e) {
                    void 0 === e && (e = +new Date()), l.callback(e);
                  }),
                  (a = window.webkitRequestAnimationFrame),
                  (window.webkitRequestAnimationFrame = function (e, t) {
                    (l.callback = e), a(d, t);
                  })),
                window.mozRequestAnimationFrame &&
                  ((t = e.indexOf("rv:")),
                  -1 !== e.indexOf("Gecko") &&
                    "2.0" === e.substr(t + 3, 3) &&
                    (window.mozRequestAnimationFrame = void 0)),
                window.requestAnimationFrame ||
                  window.webkitRequestAnimationFrame ||
                  window.mozRequestAnimationFrame ||
                  window.oRequestAnimationFrame ||
                  window.msRequestAnimationFrame ||
                  function (e, t) {
                    var a, d;
                    window.setTimeout(function () {
                      (a = +new Date()),
                        e(a),
                        (d = +new Date()),
                        (l.timeout = 1e3 / 60 - (d - a));
                    }, l.timeout);
                  }
              );
            })();
            var l = i(n);
            e.css({ width: l }),
              o.css("left", l),
              e.each(function (e) {
                var t = s(this),
                  a = 0,
                  d = function () {
                    (a -= 1),
                      t.position().left <= -l &&
                        (t.css("left", parseInt(l - 1)), (a = 0)),
                      t.css("transform", "translate3d(" + 0.8 * a + "px,0,0)"),
                      requestNextAnimationFrame(d),
                      s(window).resize(function () {
                        (l = i(n)), (a = 0), n.css("left", 0), o.css("left", l);
                      });
                  };
                d();
              });
          })();
        });
    }
    function d() {
      var e = s(".eltdf-text-marquee");
      e.length &&
        e.each(function () {
          var e = s(this),
            t = "",
            a = "",
            d = "",
            l = "",
            n = "",
            o = "",
            i = "";
          void 0 !== e.data("item-class") &&
            !1 !== e.data("item-class") &&
            (t = e.data("item-class")),
            void 0 !== e.data("font-size-1366") &&
              !1 !== e.data("font-size-1366") &&
              (a += "font-size: " + e.data("font-size-1366") + " !important;"),
            void 0 !== e.data("font-size-1024") &&
              !1 !== e.data("font-size-1024") &&
              (d += "font-size: " + e.data("font-size-1024") + " !important;"),
            void 0 !== e.data("font-size-768") &&
              !1 !== e.data("font-size-768") &&
              (l += "font-size: " + e.data("font-size-768") + " !important;"),
            void 0 !== e.data("font-size-680") &&
              !1 !== e.data("font-size-680") &&
              (n += "font-size: " + e.data("font-size-680") + " !important;"),
            void 0 !== e.data("line-height-1366") &&
              !1 !== e.data("line-height-1366") &&
              (a +=
                "line-height: " + e.data("line-height-1366") + " !important;"),
            void 0 !== e.data("line-height-1024") &&
              !1 !== e.data("line-height-1024") &&
              (d +=
                "line-height: " + e.data("line-height-1024") + " !important;"),
            void 0 !== e.data("line-height-768") &&
              !1 !== e.data("line-height-768") &&
              (l +=
                "line-height: " + e.data("line-height-768") + " !important;"),
            void 0 !== e.data("line-height-680") &&
              !1 !== e.data("line-height-680") &&
              (n +=
                "line-height: " + e.data("line-height-680") + " !important;"),
            (a.length || d.length || l.length || n.length) &&
              (a.length &&
                (i +=
                  "@media only screen and (max-width: 1366px) {.eltdf-text-marquee." +
                  t +
                  " { " +
                  a +
                  " } }"),
              d.length &&
                (i +=
                  "@media only screen and (max-width: 1024px) {.eltdf-text-marquee." +
                  t +
                  " { " +
                  d +
                  " } }"),
              l.length &&
                (i +=
                  "@media only screen and (max-width: 768px) {.eltdf-text-marquee." +
                  t +
                  " { " +
                  l +
                  " } }"),
              n.length &&
                (i +=
                  "@media only screen and (max-width: 680px) {.eltdf-text-marquee." +
                  t +
                  " { " +
                  n +
                  " } }")),
            i.length && (o = '<style type="text/css">' + i + "</style>"),
            o.length && s("head").append(o);
        });
    }
    ((eltdf.modules.textMarquee = e).eltdfInitTextMarquee = a),
      (e.eltdfTextMarqueeResize = d),
      (e.eltdfOnDocumentReady = t),
      s(document).ready(t);
  })(jQuery),
  (function (s) {
    "use strict";
    var e = {};
    function t() {
      a();
    }
    function a() {
      var o = s(".eltdf-uncovering-sections");
      o.length &&
        o.each(function () {
          var e = s(this),
            t = o.find(".curtains"),
            a = t.find(".eltdf-uss-item"),
            d = o.find(".eltdf-fss-shadow"),
            l = eltdf.body,
            n = "";
          l.hasClass("eltdf-light-header")
            ? (n = "light")
            : l.hasClass("eltdf-dark-header") && (n = "dark"),
            l.addClass("eltdf-uncovering-section-on-page"),
            0 < eltdfPerPageVars.vars.eltdfHeaderVerticalWidth &&
              1024 < eltdf.windowWidth &&
              (a.css({
                left: eltdfPerPageVars.vars.eltdfHeaderVerticalWidth,
                width:
                  "calc(100% - " +
                  eltdfPerPageVars.vars.eltdfHeaderVerticalWidth +
                  "px)",
              }),
              d.css({
                left: eltdfPerPageVars.vars.eltdfHeaderVerticalWidth,
                width:
                  "calc(100% - " +
                  eltdfPerPageVars.vars.eltdfHeaderVerticalWidth +
                  "px)",
              })),
            t.curtain({
              scrollSpeed: 400,
              nextSlide: function () {
                i(t, n);
              },
              prevSlide: function () {
                i(t, n);
              },
            }),
            i(t, n),
            (function (e) {
              var t = e.find(".eltdf-uss-item"),
                i = "",
                a = "";
              t.each(function () {
                var e = s(this),
                  t = e.find(".eltdf-uss-image-holder"),
                  a = "",
                  d = "",
                  l = "",
                  n = "",
                  o = "";
                void 0 !== e.data("item-class") &&
                  !1 !== e.data("item-class") &&
                  (a = e.data("item-class")),
                  void 0 !== t.data("laptop-image") &&
                    !1 !== t.data("laptop-image") &&
                    (d = t.data("laptop-image")),
                  void 0 !== t.data("tablet-image") &&
                    !1 !== t.data("tablet-image") &&
                    (l = t.data("tablet-image")),
                  void 0 !== t.data("tablet-portrait-image") &&
                    !1 !== t.data("tablet-portrait-image") &&
                    (n = t.data("tablet-portrait-image")),
                  void 0 !== t.data("mobile-image") &&
                    !1 !== t.data("mobile-image") &&
                    (o = t.data("mobile-image")),
                  (d.length || l.length || n.length || o.length) &&
                    (d.length &&
                      (i +=
                        "@media only screen and (max-width: 1366px) {.eltdf-uss-item." +
                        a +
                        " .eltdf-uss-image-holder { background-image: url(" +
                        d +
                        ") !important; } }"),
                    l.length &&
                      (i +=
                        "@media only screen and (max-width: 1024px) {.eltdf-uss-item." +
                        a +
                        " .eltdf-uss-image-holder { background-image: url( " +
                        l +
                        ") !important; } }"),
                    n.length &&
                      (i +=
                        "@media only screen and (max-width: 800px) {.eltdf-uss-item." +
                        a +
                        " .eltdf-uss-image-holder { background-image: url( " +
                        n +
                        ") !important; } }"),
                    o.length &&
                      (i +=
                        "@media only screen and (max-width: 680px) {.eltdf-uss-item." +
                        a +
                        " .eltdf-uss-image-holder { background-image: url( " +
                        o +
                        ") !important; } }"));
              }),
                i.length && (a = '<style type="text/css">' + i + "</style>");
              a.length && s("head").append(a);
            })(t),
            e.addClass("eltdf-loaded");
        });
    }
    function i(e, t) {
      var a = e.find(".current").data("header-style");
      void 0 !== a && "" !== a
        ? eltdf.body
            .removeClass("eltdf-light-header eltdf-dark-header")
            .addClass("eltdf-" + a + "-header")
        : "" !== t
        ? eltdf.body
            .removeClass("eltdf-light-header eltdf-dark-header")
            .addClass("eltdf-" + t + "-header")
        : eltdf.body.removeClass("eltdf-light-header eltdf-dark-header");
    }
    ((eltdf.modules.uncoveringSections = e).eltdfInitUncoveringSections = a),
      (e.eltdfOnDocumentReady = t),
      s(document).ready(t);
  })(jQuery),
  (function (r) {
    "use strict";
    var e = {};
    function t() {
      a();
    }
    function a() {
      var o = r(".eltdf-vertical-split-slider"),
        i = !0;
      if (o.length) {
        eltdf.body.hasClass("eltdf-vss-initialized") &&
          (eltdf.body.removeClass("eltdf-vss-initialized"),
          r.fn.multiscroll.destroy()),
          o.height(eltdf.windowHeight).animate({ opacity: 1 }, 300);
        var s = "";
        eltdf.body.hasClass("eltdf-light-header")
          ? (s = "light")
          : eltdf.body.hasClass("eltdf-dark-header") && (s = "dark"),
          o.multiscroll({
            scrollingSpeed: 700,
            easing: "easeInOutQuart",
            navigation: !0,
            useAnchorsOnLoad: !1,
            sectionSelector: ".eltdf-vss-ms-section",
            leftSelector: ".eltdf-vss-ms-left",
            rightSelector: ".eltdf-vss-ms-right",
            afterRender: function () {
              f(
                r(".eltdf-vss-ms-left .eltdf-vss-ms-section:first-child").data(
                  "header-style"
                ),
                s
              ),
                eltdf.body.addClass("eltdf-vss-initialized");
              var e = r("div.wpcf7 > form");
              e.length &&
                e.each(function () {
                  var t = r(this);
                  t.find(".wpcf7-submit")
                    .off()
                    .on("click", function (e) {
                      e.preventDefault(), wpcf7.submit(t);
                    });
                });
              var t = r('<div class="eltdf-vss-responsive"></div>'),
                a = o.find(".eltdf-vss-ms-left > div"),
                d = o.find(".eltdf-vss-ms-right > div");
              o.after(t);
              for (var l = 0; l < a.length; l++)
                t.append(r(a[l]).clone(!0)),
                  t.append(r(d[a.length - 1 - l]).clone(!0));
              var n = r(".eltdf-vss-responsive .eltdf-google-map");
              n.length &&
                n.each(function () {
                  var e = r(this);
                  e.empty();
                  var t = Math.floor(1e5 * Math.random() + 1);
                  e.attr("id", "eltdf-map-" + t), e.data("unique-id", t);
                }),
                "function" ==
                  typeof eltdf.modules.animationHolder
                    .eltdfInitAnimationHolder &&
                  eltdf.modules.animationHolder.eltdfInitAnimationHolder(),
                "function" == typeof eltdf.modules.button.eltdfButton &&
                  eltdf.modules.button.eltdfButton().init(),
                "function" ==
                  typeof eltdf.modules.elementsHolder
                    .eltdfInitElementsHolderResponsiveStyle &&
                  eltdf.modules.elementsHolder.eltdfInitElementsHolderResponsiveStyle(),
                "function" ==
                  typeof eltdf.modules.googleMap.eltdfShowGoogleMap &&
                  eltdf.modules.googleMap.eltdfShowGoogleMap(),
                "function" == typeof eltdf.modules.icon.eltdfIcon &&
                  eltdf.modules.icon.eltdfIcon().init(),
                i &&
                  "function" ==
                    typeof eltdf.modules.progressBar.eltdfInitProgressBars &&
                  r(
                    r(
                      ".eltdf-vss-ms-left .eltdf-vss-ms-section, .eltdf-vss-ms-right .eltdf-vss-ms-section"
                    )[0]
                  ).find(".eltdf-progress-bar").length &&
                  (eltdf.modules.progressBar.eltdfInitProgressBars(), (i = !1));
            },
            onLeave: function (e, t) {
              var a, d;
              "function" ==
                typeof eltdf.modules.progressBar.eltdfInitProgressBars &&
                r(
                  r(
                    ".eltdf-vss-ms-left .eltdf-vss-ms-section, .eltdf-vss-ms-right .eltdf-vss-ms-section"
                  )[t]
                ).find(".eltdf-progress-bar").length &&
                setTimeout(function () {
                  eltdf.modules.progressBar.eltdfInitProgressBars(), (i = !1);
                }, 700),
                (d = t),
                (a = o).hasClass("eltdf-vss-scrolling-animation") &&
                  (1 < d && !a.hasClass("eltdf-vss-scrolled")
                    ? a.addClass("eltdf-vss-scrolled")
                    : 1 === d &&
                      a.hasClass("eltdf-vss-scrolled") &&
                      a.removeClass("eltdf-vss-scrolled")),
                f(
                  r(r(".eltdf-vss-ms-left .eltdf-vss-ms-section")[t - 1]).data(
                    "header-style"
                  ),
                  s
                );
            },
          }),
          eltdf.windowWidth <= 1024
            ? r.fn.multiscroll.destroy()
            : r.fn.multiscroll.build(),
          r(window).resize(function () {
            eltdf.windowWidth <= 1024
              ? r.fn.multiscroll.destroy()
              : r.fn.multiscroll.build();
          });
      }
    }
    function f(e, t) {
      void 0 !== e && "" !== e
        ? eltdf.body
            .removeClass("eltdf-light-header eltdf-dark-header")
            .addClass("eltdf-" + e + "-header")
        : "" !== t
        ? eltdf.body
            .removeClass("eltdf-light-header eltdf-dark-header")
            .addClass("eltdf-" + t + "-header")
        : eltdf.body.removeClass("eltdf-light-header eltdf-dark-header");
    }
    ((eltdf.modules.verticalSplitSlider = e).eltdfInitVerticalSplitSlider = a),
      (e.eltdfOnDocumentReady = t),
      r(document).ready(t);
  })(jQuery),
  (function (b) {
    "use strict";
    var e = {};
    function t() {
      !(function () {
        var e = b(".eltdf-horizontaly-scrolling-portfolio-holder");
        if (e.length && 768 <= eltdf.windowWidth) {
          var o = e.find(".eltdf-hspl-inner"),
            t = e.find(".eltdf-hspl-item"),
            a = 0,
            d = 280,
            i = e.data("header-decrease"),
            s = e.data("content-bottom-decrease"),
            l = function () {
              (d =
                eltdf.windowWidth <= 1440 && 1280 < eltdf.windowWidth
                  ? eltdf.windowHeight <= 645
                    ? 200
                    : 260
                  : eltdf.windowWidth <= 1280 && 1024 < eltdf.windowWidth
                  ? 220
                  : eltdf.windowWidth <= 1024 && 768 < eltdf.windowWidth
                  ? 250
                  : 768 == eltdf.windowWidth
                  ? 320
                  : 280),
                (a = 0),
                t.each(function () {
                  var e = b(this),
                    t = e.hasClass("eltdf-hspl-featured") ? 2 * d : d;
                  (a += t), e.width(t);
                }),
                o.width(a);
            },
            n = function () {
              var e = eltdf.windowHeight;
              if ("yes" == i) {
                var t = b(".no-touch .eltdf-page-header"),
                  a = b(".touch .eltdf-mobile-header"),
                  d = 0;
                t.length && (d = t.outerHeight()),
                  a.length && (d = a.outerHeight()),
                  (e -= d);
              }
              if ("yes" == s) {
                var l = b(".eltdf-content-bottom"),
                  n = 0;
                l.length && (n = l.outerHeight()), (e -= n);
              }
              o.css({ height: e });
            };
          if (
            (n(),
            l(),
            eltdf.body.hasClass("eltdf-smooth-page-transitions-preloader")
              ? b(document).on("eltdfLoaderRemoved", function () {
                  o.addClass("eltdf-ready");
                })
              : o.addClass("eltdf-ready"),
            b(window).resize(function () {
              n(), l();
            }),
            eltdf.htmlEl.hasClass("touch"))
          ) {
            var r = document.querySelector(".eltdf-hspl-inner"),
              f = b(".eltdf-hspl-inner"),
              c = new Hammer(r),
              u = 0,
              h = function (e) {
                f.css("transform", "translate3d(" + e + "px, 0, 0)");
              };
            c.on("swipe", function (e) {
              (u =
                0 < e.deltaX
                  ? ((u += e.distance), Math.min(0, u))
                  : ((u -= e.distance),
                    -Math.min(
                      a -
                        f.parent().width() -
                        parseInt(
                          f.find("article:last-child").css("margin-right")
                        ),
                      Math.abs(u)
                    ))),
                h(u);
            }),
              b(window).on("resize", function () {
                Math.abs(u) >=
                  a -
                    f.parent().width() -
                    parseInt(
                      f.find("article:last-child").css("margin-right")
                    ) &&
                  h(
                    -a +
                      f.parent().width() +
                      parseInt(f.find("article:last-child").css("margin-right"))
                  );
              });
          } else {
            var r = document.querySelector(".eltdf-hspl-inner"),
              m = r.getBoundingClientRect().width,
              p = 0,
              g = 0,
              v =
                2 * parseInt(e.parent().css("paddingLeft")) -
                parseInt(
                  window.getComputedStyle(r.querySelector("article:last-child"))
                    .marginRight
                );
            eltdf.htmlEl.add(eltdf.body).addClass("eltdf-overflow-hidden"),
              eltdf.modules.common.eltdfDisableScroll(),
              window.addEventListener("resize", function () {
                (v =
                  2 * parseInt(e.parent().css("paddingLeft")) -
                  parseInt(
                    window.getComputedStyle(
                      r.querySelector("article:last-child")
                    ).marginRight
                  )),
                  (m = r.getBoundingClientRect().width);
              }),
              VirtualScroll.on(function (e) {
                (p += e.deltaY),
                  (p = Math.max(-1 * (m - window.innerWidth + v), p)),
                  (p = Math.min(0, p));
              });
            var y = function () {
              requestAnimationFrame(y);
              var e = "translate3d(" + (g += 0.08 * (p - g)) + "px, 0px, 0px)",
                t = r.style;
              (t.transform = e),
                (t.webkitTransform = e),
                (t.mozTransform = e),
                (t.msTransform = e);
            };
            y();
          }
        }
      })();
    }
    ((eltdf.modules.horizontalyScrollingPortfolioList =
      e).eltdfOnDocumentReady = t),
      b(document).ready(t);
  })(jQuery),
  (function (h) {
    "use strict";
    var e = {};
    function t() {
      var e;
      (e = h(".eltdf-portfolio-list-holder .eltdf-pl-filter-holder")).length &&
        e.each(function () {
          var l = h(this),
            n = l.closest(".eltdf-portfolio-list-holder"),
            o = n.find(".eltdf-pl-inner"),
            i = !!n.hasClass("eltdf-pl-pag-load-more");
          l.find(".eltdf-pl-filter:first").addClass("eltdf-pl-current"),
            n.hasClass("eltdf-pl-gallery") && o.isotope(),
            l.find(".eltdf-pl-filter").on("click", function () {
              var e = h(this),
                t = e.attr("data-filter"),
                a = t.length ? t.substring(1) : "",
                d = !!o.children().hasClass(a);
              e
                .parent()
                .children(".eltdf-pl-filter")
                .removeClass("eltdf-pl-current"),
                e.addClass("eltdf-pl-current"),
                i && !d && t.length
                  ? (function d(e, t, a) {
                      var l = e,
                        n = l.find(".eltdf-pl-inner"),
                        o = t,
                        i = a,
                        s = 0;
                      void 0 !== l.data("max-num-pages") &&
                        !1 !== l.data("max-num-pages") &&
                        (s = l.data("max-num-pages"));
                      var r = eltdf.modules.common.getLoadMoreData(l),
                        f = r.nextPage,
                        c = eltdf.modules.common.setLoadMoreAjaxData(
                          r,
                          "sahel_core_portfolio_ajax_load_more"
                        ),
                        u = l.find(".eltdf-pl-loading");
                      f <= s &&
                        (u.addClass("eltdf-showing eltdf-filter-trigger"),
                        n.css("opacity", "0"),
                        h.ajax({
                          type: "POST",
                          data: c,
                          url: eltdfGlobalVars.vars.eltdfAjaxUrl,
                          success: function (e) {
                            f++, l.data("next-page", f);
                            var t = h.parseJSON(e),
                              a = t.html;
                            l.waitForImages(function () {
                              n.append(a)
                                .isotope("reloadItems")
                                .isotope({ sortBy: "original-order" });
                              var e = !!n.children().hasClass(i);
                              e
                                ? setTimeout(function () {
                                    eltdf.modules.common.setFixedImageProportionSize(
                                      l,
                                      n.find("article"),
                                      n
                                        .find(".eltdf-masonry-grid-sizer")
                                        .width()
                                    ),
                                      n
                                        .isotope("layout")
                                        .isotope({ filter: o }),
                                      u.removeClass(
                                        "eltdf-showing eltdf-filter-trigger"
                                      ),
                                      setTimeout(function () {
                                        n.css("opacity", "1"),
                                          m(),
                                          eltdf.modules.common.eltdfInitParallax();
                                      }, 150);
                                  }, 400)
                                : (u.removeClass(
                                    "eltdf-showing eltdf-filter-trigger"
                                  ),
                                  d(l, o, i));
                            });
                          },
                        }));
                    })(n, t, a)
                  : ((t = 0 === t.length ? "*" : t),
                    l
                      .parent()
                      .children(".eltdf-pl-inner")
                      .isotope({ filter: t }),
                    eltdf.modules.common.eltdfInitParallax());
            });
        }),
        m(),
        d().init(),
        eltdf.modules.common.eltdfInitImageFX(
          ".eltdf-pl-standard-blur article",
          "img"
        );
    }
    function a() {
      d().scroll();
    }
    function m() {
      var e = h(
        ".eltdf-portfolio-list-holder.eltdf-pl-has-article-loading-animation"
      );
      if (e.length && !eltdf.htmlEl.hasClass("touch")) {
        var t = function () {
          e.each(function () {
            var a = h(this).find(".eltdf-pl-inner").find("article");
            a.appear(function () {
              var e = h(this),
                t = a.index(h(this)) % 5;
              e.addClass("eltdf-appeared").css(
                "transition-delay",
                100 * t + "ms"
              );
            });
          });
        };
        eltdf.body.hasClass("eltdf-smooth-page-transitions-preloader")
          ? h(document).on("eltdfLoaderRemoved", function () {
              t();
            })
          : t();
      }
    }
    function d() {
      var e = h(".eltdf-portfolio-list-holder"),
        l = function (e) {
          var t =
            e.outerHeight() +
            e.offset().top -
            eltdfGlobalVars.vars.eltdfAddForAdminBar;
          !e.hasClass("eltdf-pl-infinite-scroll-started") &&
            eltdf.scroll + eltdf.windowHeight > t &&
            n(e);
        },
        n = function (a, d) {
          var l,
            n,
            o = a.find(".eltdf-pl-inner");
          void 0 !== a.data("max-num-pages") &&
            !1 !== a.data("max-num-pages") &&
            (n = a.data("max-num-pages")),
            a.hasClass("eltdf-pl-pag-standard") && a.data("next-page", d),
            a.hasClass("eltdf-pl-pag-infinite-scroll") &&
              a.addClass("eltdf-pl-infinite-scroll-started");
          var e = eltdf.modules.common.getLoadMoreData(a),
            i = a.find(".eltdf-pl-loading");
          if ((l = e.nextPage) <= n || 0 === n) {
            a.hasClass("eltdf-pl-pag-standard")
              ? (i.addClass("eltdf-showing eltdf-standard-pag-trigger"),
                a.addClass("eltdf-pl-pag-standard-animate"))
              : i.addClass("eltdf-showing");
            var t = eltdf.modules.common.setLoadMoreAjaxData(
              e,
              "sahel_core_portfolio_ajax_load_more"
            );
            h.ajax({
              type: "POST",
              data: t,
              url: eltdfGlobalVars.vars.eltdfAjaxUrl,
              success: function (e) {
                a.hasClass("eltdf-pl-pag-standard") || l++,
                  a.data("next-page", l);
                var t = h.parseJSON(e).html;
                a.hasClass("eltdf-pl-pag-standard")
                  ? (s(a, n, l),
                    a.waitForImages(function () {
                      a.hasClass("eltdf-pl-masonry")
                        ? r(a, o, i, t)
                        : a.hasClass("eltdf-pl-gallery") &&
                          a.hasClass("eltdf-pl-has-filter")
                        ? r(a, o, i, t)
                        : f(a, o, i, t);
                    }))
                  : a.waitForImages(function () {
                      a.hasClass("eltdf-pl-masonry")
                        ? 1 === d
                          ? r(a, o, i, t)
                          : c(a, o, i, t)
                        : a.hasClass("eltdf-pl-gallery") &&
                          a.hasClass("eltdf-pl-has-filter") &&
                          1 !== d
                        ? c(a, o, i, t)
                        : 1 === d
                        ? f(a, o, i, t)
                        : u(o, i, t);
                    }),
                  a.hasClass("eltdf-pl-infinite-scroll-started") &&
                    a.removeClass("eltdf-pl-infinite-scroll-started");
              },
            });
          }
          l === n && a.find(".eltdf-pl-load-more-holder").hide();
        },
        s = function (e, t, a) {
          var d = e.find(".eltdf-pl-standard-pagination"),
            l = d.find("li.eltdf-pag-number"),
            n = d.find("li.eltdf-pag-prev a"),
            o = d.find("li.eltdf-pag-next a");
          l.removeClass("eltdf-pag-active"),
            l.eq(a - 1).addClass("eltdf-pag-active"),
            n.data("paged", a - 1),
            o.data("paged", a + 1),
            1 < a ? n.css({ opacity: "1" }) : n.css({ opacity: "0" }),
            a === t ? o.css({ opacity: "0" }) : o.css({ opacity: "1" });
        },
        r = function (e, t, a, d) {
          t.find("article").remove(),
            t.append(d),
            eltdf.modules.common.setFixedImageProportionSize(
              e,
              t.find("article"),
              t.find(".eltdf-masonry-grid-sizer").width()
            ),
            t.isotope("reloadItems").isotope({ sortBy: "original-order" }),
            a.removeClass("eltdf-showing eltdf-standard-pag-trigger"),
            e.removeClass("eltdf-pl-pag-standard-animate"),
            setTimeout(function () {
              t.isotope("layout"),
                m(),
                eltdf.modules.common.eltdfInitParallax(),
                eltdf.modules.common.eltdfPrettyPhoto();
            }, 600);
        },
        f = function (e, t, a, d) {
          a.removeClass("eltdf-showing eltdf-standard-pag-trigger"),
            e.removeClass("eltdf-pl-pag-standard-animate"),
            t.html(d),
            m(),
            eltdf.modules.common.eltdfInitParallax(),
            eltdf.modules.common.eltdfPrettyPhoto();
        },
        c = function (e, t, a, d) {
          t.append(d),
            eltdf.modules.common.setFixedImageProportionSize(
              e,
              t.find("article"),
              t.find(".eltdf-masonry-grid-sizer").width()
            ),
            t.isotope("reloadItems").isotope({ sortBy: "original-order" }),
            a.removeClass("eltdf-showing"),
            setTimeout(function () {
              t.isotope("layout"),
                m(),
                eltdf.modules.common.eltdfInitParallax(),
                eltdf.modules.common.eltdfPrettyPhoto();
            }, 600);
        },
        u = function (e, t, a) {
          t.removeClass("eltdf-showing"),
            e.append(a),
            m(),
            eltdf.modules.common.eltdfInitParallax(),
            eltdf.modules.common.eltdfPrettyPhoto();
        };
      return {
        init: function () {
          e.length &&
            e.each(function () {
              var d,
                e,
                t,
                a = h(this);
              a.hasClass("eltdf-pl-pag-standard") &&
                (e = (d = a).find(".eltdf-pl-standard-pagination li")).length &&
                e.each(function () {
                  var t = h(this).children("a"),
                    a = 1;
                  t.on("click", function (e) {
                    e.preventDefault(),
                      e.stopPropagation(),
                      void 0 !== t.data("paged") &&
                        !1 !== t.data("paged") &&
                        (a = t.data("paged")),
                      n(d, a);
                  });
                }),
                a.hasClass("eltdf-pl-pag-load-more") &&
                  (t = a)
                    .find(".eltdf-pl-load-more a")
                    .on("click", function (e) {
                      e.preventDefault(), e.stopPropagation(), n(t);
                    }),
                a.hasClass("eltdf-pl-pag-infinite-scroll") && l(a);
            });
        },
        scroll: function () {
          e.length &&
            e.each(function () {
              var e = h(this);
              e.hasClass("eltdf-pl-pag-infinite-scroll") && l(e);
            });
        },
        getMainPagFunction: function (e, t) {
          n(e, t);
        },
      };
    }
    ((eltdf.modules.portfolioList = e).eltdfOnWindowLoad = t),
      (e.eltdfOnWindowScroll = a),
      h(window).load(t),
      h(window).scroll(a);
  })(jQuery);
