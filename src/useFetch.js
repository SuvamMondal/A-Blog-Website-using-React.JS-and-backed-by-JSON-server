//Making a Custom Hook//

import { useState, useEffect } from 'react';

const useFetch = (url) => {

    const abortCont = new AbortController();

    const [data, setData] = useState(null); //Hook
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);    
    
    useEffect(()=>{  //useEffect is a Hook//

        setTimeout(() => {
            fetch(url, {signal: abortCont.signal} )  //To cancel the "Abort" error//

            .then((res)=>{
                if(!res.ok){
                    throw Error('Could not fetch the data for that resource');
                }
                return res.json();
            })

            .then((data)=>{
                setData(data);
                setIsPending(false);
                setError(null);
           })

            .catch(err => {

                if( err.name === 'AbortError'){
                    console.log('fetch aborted');
                }

                else{
                    setIsPending(false);
                    setError(err.message); // throw Error('Could not fetch the data for that resource'); is passed through catch function //
                }
               
            });

        }, 1000 );

        return () =>abortCont.abort(); // return() => console.log('clean up');

    },[url]);

    return { data, isPending, error }

}
 
export default useFetch;