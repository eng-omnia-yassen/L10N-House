let $window=$(window),
    $navEle=$("nav.navbar");
    
$window.on("DOMContentLoaded",function(){
    $(".loadingPage").delay(5000).fadeOut(function(){
        $("body").removeClass('overflow-hidden')
    });
})


scrollWindow()
    
$window.on('scroll',function(){
    let $scrollY=$window.scrollTop();
    scrollWindow()
    updateActiveOfNavLinkWhileScroll ($scrollY)
})

changeActiveForNavLink()

new WOW({
    animateClass: 'animate__animated',
    boxClass:     'wow',
    offset: 0,
    mobile: true,
    live: true
}).init();

let services=null;
(async function (){
    let res= await fetch('https://semicode.tech/api/v1/l10nhouse/services');
    services=await res.json();
    let i=0;
    services.forEach(service => {
        let servicesContainer=$("#Services .row");
        servicesContainer.append(`
        <div class="col-md-6 col-lg-6 box wow ${((i+1)%2==0)? 'animate__fadeInRight':'animate__fadeInLeft'}" data-wow-delay='${(i*.3)}s' data-wow-duration=".5s">
            <div class="item text-center">
            <img src="images/${service.icon}" alt="s1-B6kku4QP" class="rounded-circle">
            <h3>${service.title}</h3>
            <p>${prepareDesc(service.description.slice(0,150))}...<span class="firstColor" onclick="showServices(${i})">Read More</span></p>
            </div>
        </div>
        `);    
        i++;    
    });
})()

let sectors=null;
(async function (){
    let res =await fetch('https://semicode.tech/api/v1/l10nhouse/sectors');
    sectors=await res.json();
    sectors.forEach(function(sector){
        let sectorContainer=$('.popup[data-popup-name="sectors"] .body .row');
        sectorContainer.append(`
            <div class="col-lg-3 part">
                <div class="item">
                <img src="images/sec/${sector.icon}" alt="" class="">
                <p>${sector.name}</p>
                </div>
            </div>
        `)
    })
}())



let languages=null;
(async function (){
    let res= await fetch("https://semicode.tech/api/v1/l10nhouse/languages");
    languages=await res.json();
    languages.forEach(function(language,index){
        let languageContainer=$('.popup[data-popup-name="language"] .body');
        languageContainer.append(`
            <div class="section ${(index!=0)? 'mt-4': ''} ">
              <h3 class="mb-3">${language.continent}</h3>
              <ul class="list-unstyled">
              ${prepareLanguageLis(language.languages)}
              </ul>
            </div>
        `)
    })
}())


$(document).ready(function(){
  $(".owl-carousel").owlCarousel({
    items:5,
    loop:true,
    autoplay:true,
    autoplayTimeout:2000,
    autoplayHoverPause:true,
    slideBy:2,
    responsive :{
        350:{
            items:1
        },
        
        650:{
            items:2
        },
        850:{
            items:3
        },
        1050:{
            items:4
        },
        1250:{
            items:5
        }
    }
  });
});

let popupBox=$('.popup .box');
popupBox.click(function(e){
    e.stopPropagation();
})