import React from 'react';
import {useRouter} from "next/router";
import Link from "next/link";

const Navigation = ({title, nav_array}) => {

    const router = useRouter();

    return (
        <div className="drop-shadow mb-8" style={{backgroundColor:"#205335", backgroundImage: "url(https://help.lalicat.com/lalicat/wp-content/uploads/2023/06/cat-bg.png)", backgroundRepeat:"no-repeat"}}>
            <div className="w-full text-2xl text-center md:text-5xl text-white uppercase py-16 whitespace-nowrap">
                {title}
            </div>
            <ul className="list-none flex flex-wrap md:flex-row flex-col items-center p-8 justify-center">
                {
                    nav_array?.map((item, index) => (
                        <li key={index} className="px-2" key={index}>
                            <Link href={"/"+item[1]} locale={router.locale}>
                                <a className={router.asPath.includes(item[1]) ? 'text-white font-extrabold':'text-gray-200'}>
                                {item[0]}
                                </a>
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};

export default Navigation;