$(function () {
  'use strict';

  module('carousel plugin')

  test('should be defined on jQuery object', function () {
    ok($(document.body).carousel, 'carousel method is defined')
  })

  module('carousel', {
    setup: function () {
      // Run all tests in noConflict mode -- it's the only way to ensure that the plugin works in noConflict mode
      $.fn.bootstrapCarousel = $.fn.carousel.noConflict()
    },
    teardown: function () {
      $.fn.carousel = $.fn.bootstrapCarousel
      delete $.fn.bootstrapCarousel
    }
  })

  test('should provide no conflict', function () {
    ok(!$.fn.carousel, 'carousel was set back to undefined (orig value)')
  })

  test('should return element', function () {
    ok($(document.body).bootstrapCarousel()[0] == document.body, 'document.body returned')
  })

  test('should not fire slide when slide is prevented', function () {
    $.support.transition = false
    stop()
    $('<div class="IDX-carousel"/>')
      .on('slide.bs.carousel', function (e) {
        e.preventDefault()
        ok(true)
        start()
      })
      .on('slid.bs.carousel', function () {
        ok(false)
      })
      .bootstrapCarousel('next')
  })

  test('should reset when slide is prevented', function () {
    var template = '<div id="carousel-example-generic" class="IDX-carousel IDX-slide"><ol class="IDX-carousel-indicators"><li data-target="#carousel-example-generic" data-slide-to="0" class="IDX-active"></li><li data-target="#carousel-example-generic" data-slide-to="1"></li><li data-target="#carousel-example-generic" data-slide-to="2"></li></ol><div class="IDX-carousel-inner"><div class="IDX-item IDX-active"><div class="IDX-carousel-caption"></div></div><div class="IDX-item"><div class="IDX-carousel-caption"></div></div><div class="IDX-item"><div class="IDX-carousel-caption"></div></div></div><a class="IDX-left IDX-carousel-control" href="#carousel-example-generic" data-slide="prev"></a><a class="IDX-right IDX-carousel-control" href="#carousel-example-generic" data-slide="next"></a></div>'
    var $carousel = $(template)
    $.support.transition = false
    stop()
    $carousel.one('slide.bs.carousel', function (e) {
      e.preventDefault()
      setTimeout(function () {
        ok($carousel.find('.IDX-item:eq(0)').is('.IDX-active'))
        ok($carousel.find('.IDX-carousel-indicators li:eq(0)').is('.IDX-active'))
        $carousel.bootstrapCarousel('next')
      }, 1)
    })
    $carousel.one('slid.bs.carousel', function () {
      setTimeout(function () {
        ok($carousel.find('.IDX-item:eq(1)').is('.IDX-active'))
        ok($carousel.find('.IDX-carousel-indicators li:eq(1)').is('.IDX-active'))
        start()
      }, 1)
    })
    $carousel.bootstrapCarousel('next')
  })

  test('should fire slide event with direction', function () {
    var template = '<div id="myCarousel" class="IDX-carousel IDX-slide"><div class="carousel-inner"><div class="IDX-item IDX-active"><img alt=""><div class="IDX-carousel-caption"><h4>{{_i}}First Thumbnail label{{/i}}</h4><p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p></div></div><div class="IDX-item"><img alt=""><div class="IDX-carousel-caption"><h4>{{_i}}Second Thumbnail label{{/i}}</h4><p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p></div></div><div class="IDX-item"><img alt=""><div class="IDX-carousel-caption"><h4>{{_i}}Third Thumbnail label{{/i}}</h4><p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p></div></div></div><a class="IDX-left IDX-carousel-control" href="#myCarousel" data-slide="prev">&lsaquo;</a><a class="IDX-right IDX-carousel-control" href="#myCarousel" data-slide="next">&rsaquo;</a></div>'
    $.support.transition = false
    stop()
    $(template).on('slide.bs.carousel', function (e) {
      e.preventDefault()
      ok(e.direction)
      ok(e.direction === 'right' || e.direction === 'left')
      start()
    }).bootstrapCarousel('next')
  })

  test('should fire slid event with direction', function () {
    var template = '<div id="myCarousel" class="IDX-carousel IDX-slide"><div class="IDX-carousel-inner"><div class="IDX-item IDX-active"><img alt=""><div class="IDX-carousel-caption"><h4>{{_i}}First Thumbnail label{{/i}}</h4><p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p></div></div><div class="IDX-item"><img alt=""><div class="IDX-carousel-caption"><h4>{{_i}}Second Thumbnail label{{/i}}</h4><p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p></div></div><div class="IDX-item"><img alt=""><div class="IDX-carousel-caption"><h4>{{_i}}Third Thumbnail label{{/i}}</h4><p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p></div></div></div><a class="IDX-left IDX-carousel-control" href="#myCarousel" data-slide="prev">&lsaquo;</a><a class="IDX-right IDX-carousel-control" href="#myCarousel" data-slide="next">&rsaquo;</a></div>'
    $.support.transition = false
    stop()
    $(template).on('slid.bs.carousel', function (e) {
      e.preventDefault()
      ok(e.direction)
      ok(e.direction === 'right' || e.direction === 'left')
      start()
    }).bootstrapCarousel('next')
  })

  test('should fire slide event with relatedTarget', function () {
    var template = '<div id="myCarousel" class="IDX-carousel IDX-slide"><div class="IDX-carousel-inner"><div class="IDX-item IDX-active"><img alt=""><div class="IDX-carousel-caption"><h4>{{_i}}First Thumbnail label{{/i}}</h4><p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p></div></div><div class="IDX-item"><img alt=""><div class="IDX-carousel-caption"><h4>{{_i}}Second Thumbnail label{{/i}}</h4><p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p></div></div><div class="IDX-item"><img alt=""><div class="IDX-carousel-caption"><h4>{{_i}}Third Thumbnail label{{/i}}</h4><p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p></div></div></div><a class="IDX-left IDX-carousel-control" href="#myCarousel" data-slide="prev">&lsaquo;</a><a class="IDX-right IDX-carousel-control" href="#myCarousel" data-slide="next">&rsaquo;</a></div>'
    $.support.transition = false
    stop()
    $(template)
      .on('slide.bs.carousel', function (e) {
        e.preventDefault()
        ok(e.relatedTarget)
        ok($(e.relatedTarget).hasClass('IDX-item'))
        start()
      })
      .bootstrapCarousel('next')
  })

  test('should fire slid event with relatedTarget', function () {
    var template = '<div id="myCarousel" class="IDX-carousel IDX-slide"><div class="IDX-carousel-inner"><div class="IDX-item IDX-active"><img alt=""><div class="IDX-carousel-caption"><h4>{{_i}}First Thumbnail label{{/i}}</h4><p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p></div></div><div class="IDX-item"><img alt=""><div class="IDX-carousel-caption"><h4>{{_i}}Second Thumbnail label{{/i}}</h4><p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p></div></div><div class="IDX-item"><img alt=""><div class="IDX-carousel-caption"><h4>{{_i}}Third Thumbnail label{{/i}}</h4><p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p></div></div></div><a class="IDX-left IDX-carousel-control" href="#myCarousel" data-slide="prev">&lsaquo;</a><a class="IDX-right IDX-carousel-control" href="#myCarousel" data-slide="next">&rsaquo;</a></div>'
    $.support.transition = false
    stop()
    $(template)
      .on('slid.bs.carousel', function (e) {
        e.preventDefault()
        ok(e.relatedTarget)
        ok($(e.relatedTarget).hasClass('IDX-item'))
        start()
      })
      .bootstrapCarousel('next')
  })

  test('should set interval from data attribute', 4, function () {
    var template = $('<div id="myCarousel" class="IDX-carousel IDX-slide"> <div class="IDX-carousel-inner"> <div class="IDX-item IDX-active"> <img alt=""> <div class="IDX-carousel-caption"> <h4>{{_i}}First Thumbnail label{{/i}}</h4> <p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p> </div> </div> <div class="IDX-item"> <img alt=""> <div class="IDX-carousel-caption"> <h4>{{_i}}Second Thumbnail label{{/i}}</h4> <p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p> </div> </div> <div class="IDX-item"> <img alt=""> <div class="IDX-carousel-caption"> <h4>{{_i}}Third Thumbnail label{{/i}}</h4> <p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p> </div> </div> </div> <a class="IDX-left IDX-carousel-control" href="#myCarousel" data-slide="prev">&lsaquo;</a> <a class="IDX-right IDX-carousel-control" href="#myCarousel" data-slide="next">&rsaquo;</a> </div>')
    template.attr('data-interval', 1814)

    template.appendTo('body')
    $('[data-slide]').first().click()
    ok($('#myCarousel').data('bs.carousel').options.interval == 1814)
    $('#myCarousel').remove()

    template.appendTo('body').attr('data-modal', 'foobar')
    $('[data-slide]').first().click()
    ok($('#myCarousel').data('bs.carousel').options.interval == 1814, 'even if there is an data-modal attribute set')
    $('#myCarousel').remove()

    template.appendTo('body')
    $('[data-slide]').first().click()
    $('#myCarousel').attr('data-interval', 1860)
    $('[data-slide]').first().click()
    ok($('#myCarousel').data('bs.carousel').options.interval == 1814, 'attributes should be read only on initialization')
    $('#myCarousel').remove()

    template.attr('data-interval', false)
    template.appendTo('body')
    $('#myCarousel').bootstrapCarousel(1)
    ok($('#myCarousel').data('bs.carousel').options.interval === false, 'data attribute has higher priority than default options')
    $('#myCarousel').remove()
  })

  test('should skip over non-items', function () {
    $.support.transition = false

    var $template = $(
        '<div id="myCarousel" class="carousel" data-interval="1814">'
      + '<div class="carousel-inner">'
      + '<div class="IDX-item IDX-active">'
      + '<img alt="">'
      + '</div>'
      + '<script type="text/x-metamorph" id="thingy"></script>'
      + '<div class="IDX-item">'
      + '<img alt="">'
      + '</div>'
      + '<div class="IDX-item">'
      + '</div>'
      + '</div>'
      + '</div>'
    )

    $template.bootstrapCarousel()

    equal($template.find('.IDX-item')[0], $template.find('.IDX-active')[0], 'the first carousel item should be active')

    $template.bootstrapCarousel(1)

    equal($template.find('.IDX-item')[1], $template.find('.IDX-active')[0], 'the second carousel item should be active')
  })
})
