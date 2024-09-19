export const LOGO =
    "https://assets.nflxext.com/ffe/siteui/vlv3/dae1f45f-c2c5-4a62-8d58-6e1b0c6b2d8e/6d1fb8a4-5844-42a4-9b01-1c6c128acf19/IN-en-20240827-TRIFECTA-perspective_WEB_c292a608-cdc6-4686-8dc8-405bfcf753af_small.jpg";

export const USER_AVATAR =
    "https://wallpapers.com/images/high/netflix-profile-pictures-1000-x-1000-w3lqr61qe57e9yt8.webp";

export const NETFLIX_LOGO =
    "https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png";

export const IMG_CDN_URL = 
    "https://image.tmdb.org/t/p/w780";    

export const API_OPTIONS= {
    method: 'GET',
    headers: {
      accept: 'application/json',
      //Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NTRhMmM5NTk5NDgyOWFkMjI2NDI5MTJhNTFmZDdjNSIsIm5iZiI6MTcyNTg5MDYyMy44NDIzNDgsInN1YiI6IjY2ZGVmNmUzYTU1NjU2OGRlZDNhZGMwMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PY5L84csrxec-nFCrpolbIJOOT06GZilTbzd0s2aH5A'
      Authorization: 'Bearer '+process.env.REACT_APP_TMDB_KEY,
    }
  };

  export const SUPPORTED_LANGUAGE =[
            {identifier: "en",name:"English"},
            {identifier: "telugu",name:"Telugu"},
            {identifier: "spanish",name:"Spanish"},
        ];

//export const OPENAI_KEY="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"    
//export const OPENAI_KEY="AIzaSyB66X9fIOhJimJLvIXB_zZNQJgsnXdEGNU";
export const OPENAI_KEY=process.env.REACT_APP_OPENAI_KEY;
