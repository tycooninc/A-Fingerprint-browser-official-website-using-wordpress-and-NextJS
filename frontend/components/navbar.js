import Image from "next/image"
import logo from '../public/images/common/logo.png'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDownload, faBars, faGlobe, faAngleDown,faUser} from "@fortawesome/free-solid-svg-icons";
import React, {useEffect, useState, useRef} from "react";
import Link from "next/link";
import {useRouter} from "next/router";

const Navbar = ({text}) => {
    const router = useRouter()
    const {locale, locales, asPath} = router
    const [mobileMenu, setMobileMenu] = useState("hideMobileMenu");
    const [offset, setOffset] = useState(0);
    const navbar = useRef();
    const [langVisible, setLangVisible] = useState(false)

    const blog_links = [
        {'name':'Browser', slug:'/browser'},
        {'name':'Multiple Accounts', slug:'/multiple-accounts'},
        {'name':'Proxy', slug:'/proxy'},
        {'name':'VPN', slug:'/vpn'},
        {'name':'IP', slug:'/ip'},
        {'name':'Automation', slug:'/automation'},
        {'name':'Cyber Security Knowledge', slug:'/cyber-security-knowledge'},
        {'name':'Marketing', slug:'/marketing'},
        {'name':'Amazon', slug:'/amazon'},
        {'name':'Ebay', slug:'/ebay'},
        {'name':'Facebook', slug:'/facebook'},
        {'name':'TikTok', slug:'/tiktok'},
        
    ];

    useEffect(() => {
        const onScroll = () => setOffset(window.pageYOffset);
        window.removeEventListener('scroll', onScroll);
        window.addEventListener('scroll', onScroll, { passive: true });
        if(window.innerWidth < 750){
            navbar.current.style.backgroundColor = "#205335";
        }
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    if(router.pathname === '/'){
        if(offset > 50 && window.innerWidth > 750){
            navbar.current.style.backgroundColor = "#205335";
            navbar.current.style.borderBottom= "1px solid gray";
        }
        if(offset < 50 && offset > 10 && window.innerWidth > 750)
        {
            navbar.current.style.backgroundColor = "transparent";
            navbar.current.style.borderBottom= "none";
        }
    }



    const toggleMobileMenu = () => {
        if(mobileMenu === "hideMobileMenu"){
            setMobileMenu("showMobileMenu");
            navbar.current.style.backgroundColor = "#205335"
        }else{
            setMobileMenu("hideMobileMenu")
        }
    }

    const changeLanguage = (e) => {
        const locale = e.target.value.toLowerCase()
        router.push(asPath,asPath,{locale})
    }

    const arrayRemove = (arr, value) => {
        return arr.filter(function(ele){
            return ele!= value
        })
    }

    const languages = ["English", "Française", "Deutsch", "Pусский","Tiếng Việt", "日本语", "Española", "Português", "Italiano"]
    let langs = []
    locales.map((item, index) => {
        langs.push({abb:item, name:languages[index]})
    })

    const navbar_arr = arrayRemove(text, 'download')
    return (
        <nav className="bg-green-900 md:bg-transparent w-full md:fixed top-0 left-0 z-30 navbar" role="navigation" ref={navbar} style={router.pathname !== '/'?{backgroundColor:"#205335"}:{backgroundColor:"transparent"}}>
            <div className="p-2 container mx-auto md:p-4 flex flex-wrap items-center md:flex-no-wrap">
                <div className="mr-4 md:mr-8">
                    <Link href="/">
                        <a rel="home">
                            <Image src={logo} alt='lalicat anti-detect-browser' height={80} width={150} />
                        </a>
                    </Link>
                </div>
                <div className="mr-4 md:mr-8 relative">
                    <a rel="home" className={'flex items-center cursor-pointer'} onClick={() => {setLangVisible(!langVisible)}}>
                        <FontAwesomeIcon icon={faGlobe} className={'pr-2'} />
                        <select onChange={changeLanguage} defaultValue={locale} className="text-white bg-transparent border-0">
                            {langs.map((item,index) =>
                                (<option key={index} value={item.abb} className="text-black p-2">{item.name}</option>)
                            )}
                        </select>
                    </a>
                </div>
                <div>
                    <a href="https://www.lalimao.com">
                        中文
                    </a>
                </div>
                <div className="ml-auto md:hidden">
                    <button className="flex items-center px-3 py-2 border rounded text-white" type="button">
                        <FontAwesomeIcon icon={faBars} onClick={toggleMobileMenu}/>
                    </button>
                </div>
                <div className="w-full md:w-auto md:flex-grow md:flex md:items-center">
                    <ul className={mobileMenu}>
                        <li>
                            <Link href="/use-cases" locale={locale}>
                                <a className="text-center md:text-left block px-4 py-1 md:p-2 lg:px-2 uppercase">
                                    {text[1]}
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/pricing" locale={locale}>
                                <a className="text-center md:text-left block px-4 py-1 md:p-2 lg:px-2 uppercase">
                                    {text[2]}
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/support" locale={locale}>
                                <a className="text-center md:text-left block px-4 py-1 md:p-2 lg:px-2 uppercase">
                                    {text[3]}
                                </a>
                            </Link>
                        </li>
                        <li className="dropdown dropdown-hover mx-2">
                            <Link href={'/blog'} locale={locale}><a className="uppercase">{text[4]}</a></Link>
                            <ul className="dropdown-content z-[1] menu shadow rounded-box w-65 bg-white text-gray-700" style={{width:285, color:"#205335"}}>
                                {
                                    blog_links.map((item,index) => (
                                        <li className="uppercase text-md p-2 text-lg p-2">
                                            <Link href={item.slug} locale={locale}>
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))
                                }
                            </ul>
                            <FontAwesomeIcon icon={faAngleDown} className="mx-2"></FontAwesomeIcon>
                        </li>
                        <li>
                            <Link href="/contact-us" locale={locale}>
                                <a className="text-red-500 text-center md:text-left block px-4 py-1 md:p-2 lg:px-4 uppercase">
                                    {text[5]}
                                </a>
                            </Link>
                        </li>
                        <li className="invisible md:visible">
                            <div className="deepbtn uppercase">
                                <FontAwesomeIcon icon={faDownload} size={'2x'} />
                                <span className="pl-2"><a href="/download">{text[6]}</a></span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar