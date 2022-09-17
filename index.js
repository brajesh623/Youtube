const API_KEY="AIzaSyAhMNL-iFVzQQ4JppvYK15Lfbidijzk3yc";

let q="";

let search = async() =>{
    let filter=document.querySelector("#filter");
    filter.setAttribute("onclick","filter_Search()");

    let search=document.querySelector("#search").value;
    let data= await getData(search); 
    q=search;
    append(data);
}

let getPopular = async  () =>{
    let url=`https://youtube.googleapis.com/youtube/v3/videos?part=snippet&maxResults=20&chart=mostPopular&regionCode=in&videoCategoryId=10&key=${API_KEY}`;

    let res=await fetch(url);
    let data= await res.json();
    append(data.items);
    return data.items;
}
getPopular();
let getData = async (query) =>{
    let url =`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${query}&key=${API_KEY}`;

    let res=await fetch(url);
    let data= await res.json();
    console.log(data);
    return data.items;
}

let append=(data)=>{
    let container=document.getElementById("container");
    container.innerHTML=null;

    data.forEach(({snippet:{title,thumbnails:{medium:{url}}}})=>{
        let img=document.createElement("img");
        img.src=url;

        let h3=document.createElement("h3");
        h3.innerText=title;

        let div=document.createElement("div");
        div.setAttribute("class","video");
        div.onclick=()=>{
            saveVideo(el);
        }
        div.append(img,h3);
        container.append(div);

    });
}

let saveVideo= (data)=>{
    localStorage.setItem("video",JSON.stringify(data));
    window.location.href = "video.html";
};
let filter = async ()=>{
    let data=await getPopular();
    data=data.filter(({snippet:{channelId}})=>{
        return channelId ==="UCn4rEMqKtwBQ6-oEwbd4PcA";
    });
    append(data);
}


let filter_Search = async ()=>{
    let data=await getData(q);
    data=data.filter(({snippet:{channelId}})=>{
        return channelId ==="UCyoXW-Dse7fURq30EWl_CUA";
    });
    append(data);
}