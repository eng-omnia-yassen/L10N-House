function scrollWindow(){
    $navEle.toggleClass('scroll',$window.scrollTop()>10);
}

function updateActiveOfNavLinkWhileScroll ($scrollY) {
    let $sections=$('header,section[id]');
    $sections.each(function(index,section){
        let $section=$(section),
        $sectionId=$section.attr('id'),
        $sectionTop=$section.offset().top-$navEle.outerHeight(true),
        $HeightOfSection=$section.outerHeight(true)+$sectionTop;
        if($scrollY<$HeightOfSection && $scrollY>$sectionTop){
            $('.nav-link.active').removeClass('active')
            $(`.nav-link[href='#${$sectionId}']`).addClass('active')
        }
    })
}
$(window).scroll(function(){
    let $arrow=$('.arrow'),
        anchor=$arrow.find('a'),
        sectionId= anchor.attr('href'),
        section=$(sectionId),
        topOfSection=section.offset().top,
        bottomOfSection=section.outerHeight(true);
        if(window.scrollY>bottomOfSection/2){
            console.log('ok')
            $arrow.css('right','-55px')
        }
        else{
            $arrow.css('right','-100px')

        }
})


function goTOHome(){
    let $arrow=$('.arrow'),
    anchor=$arrow.find('a'),
    sectionId= anchor.attr('href'),
    section=$(sectionId),
    topOfSection=section.offset().top,

    bottomOfSection=topOfSection+section.outerHeight(true);
    $arrow.click(function(){
        window.scrollTo(0,topOfSection)
        $arrow.css('top',bottomOfSection/2)
        $arrow.css('bottom','initial')
    })

    $arrow.hover(function(){
        $arrow.css('right','0')
    },function(){
            $arrow.css('right','-55px')
    })
    // $arrow.css('top',"50%");
}

function changeActiveForNavLink(){
    let navLink=$('.nav-link');
    navLink.each(function(index,link){
        let newLink=$(link);
        newLink.click(function (e) { 
            e.preventDefault();
            let sectionId=newLink.attr('href'),
                section=$(sectionId),
                SectionTop;
                if(section.attr("id")=='AboutUs'){
                    SectionTop=section.offset().top-$navEle.outerHeight(true)+25;
                }
                else{
                    SectionTop=section.offset().top-$navEle.outerHeight(true)+2;
                }
                currentNavLink=$('.nav-link.active');
            currentNavLink.removeClass('active');
            newLink.addClass('active')
            window.scrollTo(0,SectionTop)
        })
    })
    
}

function prepareDesc(desc){
    let regex=/L10N House/gmi;
   return desc.replace(regex,`<span class="text"><span class="firstColor">L10N</span> <span class="secondColor">House</span></span>`);
}

function openPopup(popupName){
    $('body').addClass('overflow-hidden');
    let popupEle=$(`.popup[data-popup-name=${popupName}]`);
    if(popupEle.data("popup-name")==="video"){
        popupEle.css('display','flex').hide().fadeIn(1000);
    }else if(popupEle.data("popup-name")==="language"){
        popupEle.fadeIn(1000,function(){
            popupEle.find('.box').addClass('show');
        });

    }
    else{
        popupEle.fadeIn(1000);
    }
}

function preparePoints (points) {
    let lis=``;
    points.forEach(function(point){
        lis+=`
            <li class="mb-2">${point}</li>
        `
    })
    return lis;
}

function prepareSections(sections){
    let sec=``;
    sections.forEach(function(section,index){
        sec+= `
            <div class="section ${(index!=0)? 'mt-4':''} ">
                <h2 class="mb-4">${section.title}</h2>
                <ol type="1" class="ps-4">
                ${preparePoints (section.points)}
                </ol>
            </div>
        `;
    })

    return sec;
}

function showServices(serviceIndex){
    let service=services[serviceIndex];
    
    let popupBody=$('.popup[data-popup-name=services] .box .body');
    popupBody.html(`
        <h2 class="text-center secondColor mb-4 fw-bold fs-3 ">${service.title}</h2>
          <div class="container">
            <div class="row mb-4">
              <div class="col-lg-6 part">
                <div class="item">
                  <p>${prepareDesc(service.description)}</p>
                </div>
              </div>
              <div class="col-lg-6 part">
                <div class="item">
                  <img src="images/${service.img}" alt="trans" class="img-fluid">
                </div>
              </div>
            </div>
            ${prepareSections(service.sections)}
          </div>
        `)
    openPopup('services')

}

function prepareLanguageLis(languages){
    let lis=``;
    languages.forEach(function(language,index){
        lis +=`
            <li class="${(index==languages.length-1)? '':'mb-2'}"><i class="fa-regular fa-circle-dot me-2"></i>${language}</li>
            `
    })
    return lis;
}

function closePopup(popupName){
    $('body').removeClass('overflow-hidden');
    let popupEle=$(`.popup[data-popup-name=${popupName}]`);
    if(popupEle.data("popup-name")==="language"){
        popupEle.find('.box').removeClass('show');
        popupEle.delay(500).fadeOut(1000);
    }
    else{
        popupEle.fadeOut(1000);
    }
}