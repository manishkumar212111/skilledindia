const menuMobile = [
    { name: "About Us", link: "/about", title: "About Us", class: "nav-link", isNew: "", default: true, _blank: false },
    { name: "Services", link: "/services", title: "Services", class: "nav-link", isNew: "", default: true, _blank: false },    
    { name: "Our Projects", link: "/projects/list", title: "Our Projects", class: "nav-link", isNew: "", default: true, _blank: false },    
    { name: "Blogs", link: "/blogs/list", title: "Blogs", class: "nav-link", isNew: "", default: true, _blank: false },
    { name: "Contact Us", link: "/contact", title:  "Contact Us", class: "nav-link", isNew: "", default: true, _blank: false },
]
const menuDesktop = [
    { name: "Home", link: "/", title: "Home", class: "nav-link", isNew: "", default: true, _blank: false },
    { name: "About Us", link: "/about", title: "About Us", class: "nav-link", isNew: "", default: true, _blank: false },
    { name: "Services", link: "/services", title: "Services", class: "nav-link", isNew: "", default: true, _blank: false },    
    { name: "Our Projects", link: "/projects/list", title: "Projects", class: "nav-link", isNew: "", default: true, _blank: false },        
    { name: "Blogs", link: "/blogs/list", title: "Blogs", class: "nav-link", isNew: "", default: true, _blank: false },
    { name: "Contact Us", link: "/contact", title:  "Contact Us", class: "nav-link", isNew: "", default: true, _blank: false },
]
const FooterMenuMobile = [
    {title: "" , class:"nav-link home-tb" , link: "/", pageName: "home"},
    // {title: "" , class:"nav-link info-tb" , link: "/info" , pageName: "info"},
    {title: "" , class:"nav-link heart-tb", link: "/wishlist" , pageName: "wishlist"},
    {title: "" , class:"nav-link prifle-tb" ,link: "/profile" ,  pageName: "profile"},
]
const FooterMenuDesktop = [
    { name: "About", link: "/about", title: "About", class: "nav-link", isNew: "", default: true, _blank: false },
    { name: "Contact", link: "/contact", title:  "Contact", class: "nav-link", isNew: "", default: true, _blank: false },
    { name: "Blog", link: "/blogs/list", title: "Blogs", class: "nav-link", isNew: "", default: true, _blank: false },
]
const projectList = [
    {description: "This is test" , src:"images/img1.png" , alt: "home" , price: "5000" , url: "testing"},
    {description: "This is test" , src:"images/img1.png" , alt: "testing" , price: "5000", url: "testing"},
]

const blogList = [
    {description: "This is test" , src:"images/img1.png" , alt: "home" , price: "5000" , url: "testing"},
    {description: "This is test" , src:"images/img1.png" , alt: "testing" , price: "5000", url: "testing"},
]
export { menuMobile ,menuDesktop ,FooterMenuMobile ,FooterMenuDesktop , projectList , blogList};