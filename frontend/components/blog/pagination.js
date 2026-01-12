import React, {useEffect, useState} from 'react';
import Link from "next/link";
import {useRouter} from "next/router";

const Pagination = ({page_count}) => {
    const [pageNumbers, setPageNumbers] = useState([])
    const router = useRouter()
    const currentPath = router.asPath
    const cpath = currentPath.split("/");
    const lpath = "/"+cpath[1]+"/";
    const {page} = router.query

    useEffect(() => {
        let pageArray = []
        if(parseInt(page_count) > 1){
            for(let i = 1; i <= parseInt(page_count); i++){
                 pageArray.push(i)
            }
            setPageNumbers(pageArray)
        }
    },[])

    return (
        <div className="max-w-[83%] m-auto flex items-center">
            {page > 1 && <Link href={lpath+(parseInt(page)-1).toString()}>
                <a className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 inline-flex items-center px-4 py-2 border text-sm font-medium">
                    {"<"}
                </a>
            </Link>}
            {pageNumbers && pageNumbers.map(item => (
                <Link href={lpath+item} key={item}>
                    {page == item ?
                        <a className="bg-green-900 border-gray-300 text-white hover:bg-gray-50 hover:text-black inline-flex items-center px-4 py-2 border text-sm font-medium">{item}</a> :
                        <a className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 inline-flex items-center px-4 py-2 border-l-0 border text-sm font-medium">{item}</a>}
                </Link>
            ))}
            {parseInt(page) < pageNumbers.length && <Link href={lpath+(parseInt(page)+1).toString()}>
                <a className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 inline-flex items-center px-4 py-2 border text-sm font-medium">
                    {">"}
                </a>
            </Link>}
        </div>
    );
};

export default Pagination;


