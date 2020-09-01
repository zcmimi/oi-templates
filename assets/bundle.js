function katex_(){
    document.querySelectorAll('code latex').forEach((x)=>{
        var y=document.createElement('span');
        katex.render(x.innerText,y,{throwOnError: false});
        x.parentElement.replaceWith(y.children[0]);
    });
    document.querySelectorAll('code latex_display').forEach((x)=>{
        var y=document.createElement('span');
        katex.render(x.innerText,y,{displayMode:true,throwOnError: false});
        x.parentElement.replaceWith(y.children[0]);
    });
}
function copy(text){
    var x=document.createElement("textarea");
    x.textContent=text;document.body.appendChild(x);
    x.select();document.execCommand('copy');
    x.remove();
}
function highlight(){
    document.querySelectorAll('pre code').forEach((x)=>{
        if(x.classList.contains("hljs-nb")){x.remove();return;}
        x.innerHTML=x.innerHTML.trim();
        var lang=x.classList[0],len=x.innerText.length;
        try{lang=lang.split('-'),lang=lang[lang.length-1];}
        catch{lang='text';}
        hljs.highlightBlock(x);
        var nb=document.createElement("code"),str="",tot=x.innerText.split('\n').length;
        for(var i=1;i<=tot;++i)str+=i+'\n';
        nb.classList.add("hljs","hljs-nb");
        nb.style.float="left";
        nb.innerText=str;
        x.parentElement.insertBefore(nb,x);

        var bar=document.createElement('div'),
            cb=document.createElement("div"),
            fd=document.createElement("div");
        cb.classList.add("hljs-cb");
        cb.setAttribute("data-title",'复制');
        cb.addEventListener("click",function(){
            copy(this.parentElement.parentElement.innerText);
            this.setAttribute('data-title','复制成功');
            setTimeout(function(it){it.setAttribute('data-title','复制');},1000,this);
            mdui.snackbar({message: "复制成功!",position: "top"});
        });

        fd.classList.add("hljs-fd");
        fd.setAttribute("data-title",'折叠');
        fd.addEventListener("click",function(){
            this.parentElement.parentElement.parentElement.hidden=1;
            this.parentElement.parentElement.parentElement.previousElementSibling.hidden=0;
        });
        var hl=document.createElement('div');
        hl.classList.add('hljs-lang');
        hl.setAttribute('data-title',lang);
        bar.classList.add("hljs-bar");
        bar.append(hl),bar.append(fd),bar.append(cb);
        x.append(bar);
        var fd_=document.createElement("div"),
            fd_ufd=document.createElement("div"),
            fd_hl=document.createElement('div'),
            fd_hle=document.createElement('div');
        fd_.hidden=1;
        fd_.addEventListener("click",function(){
            this.hidden=1;
            this.nextElementSibling.hidden=0;
        });
 
        fd_ufd.classList.add("hljs-fd");
        fd_ufd.setAttribute("data-title",'展开');
        fd_ufd.classList.add("hljs-fd");
        fd_hl.classList.add('hljs-lang');
        fd_hl.setAttribute('data-title',lang);
        fd_hle.classList.add('hljs-len');
        fd_hle.setAttribute('data-title',len);
        fd_.append(fd_hl),fd_.append(fd_hle),fd_.append(fd_ufd);
        x.parentElement.parentElement.insertBefore(fd_,x.parentElement);
    });
    var sty=document.createElement("style");
    sty.type="text/css",
    sty.innerHTML=[
        ".hljs{position:relative;}",
        ".hljs-bar{display:none;width:fit-content;position:absolute;top:0;right:0;}",
        ".hljs:hover .hljs-bar{display:block;}",
        ".hljs-cb,.hljs-fd,.hljs-lang,.hljs-len{",
            "display: inline-block;",
            "width: fit-content;",
            "color: #fff;",
            "padding: 2px 5px;",
            "cursor: pointer;",
        "}", 
        ".hljs-cb{","background-color: #F7A4B9;","}",
        ".hljs-fd{","background-color: #66ccff;","}",
        ".hljs-lang{","background-color: #39c5bb;","}",
        ".hljs-len{","background-color: #f7a4b9;","}",
        ".hljs-fd:after,.hljs-cb:after,.hljs-lang:after,.hljs-len:after{","content: attr(data-title)","}",
        ".hljs-nb{color: #bbb !important;}"
    ].join("");
    document.getElementsByTagName("head")[0].appendChild(sty);
}