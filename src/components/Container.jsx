import React, { useEffect, useState } from 'react';

import { useItersectionElement } from '../hooks/userIntersectionElement';

const Container = () => {

    const [data, setData ] = useState([]);
    const [page, setPage ] = useState(1);
    const [ show, ref ] = useItersectionElement();

    const handleFetchData = ( page = 1 ) => {
        fetch(`https://developers.syscom.mx/api/v1/productos?categoria=22&pagina=${ page }`, {
            headers: { Authorization: `Bearer ${ import.meta.env.VITE_TOKEN_SYSCOM }`}
        })
        .then( respo => respo.json())
        .then( response => {
            setData(data.concat(response.productos));
            setPage(page);
        });
    }

    useEffect(() => {
        handleFetchData();
    }, []);

    const handleNewElements = ( evt ) => {
        evt.preventDefault();
        let newPage = page + 1;
        handleFetchData(newPage);
    }

    return (
        <div className = "album py-5 bg-body-tertiary">
            <div className = "container" style = {{ overflowY: 'scroll', height: '400px' }}>
                <div className = "row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                    {
                        data?.map( (item, i) => {                            
                            return (
                                <div className = "col" key = { i }>
                                    <div className="card shadow-sm">
                                        <img src = { item.img_portada } className = "img-responsive" />
                                        <div className = "card-body">
                                            <p className = "card-text">{ item.titulo }</p>
                                        </div>
                                    </div>
                                </div>  
                            )
                        })
                    }
                </div>
                <div className=' text-center' ref = { ref }>
                    {
                        show ?
                            <button type = "button" className = "btn btn-primary" onClick={ handleNewElements }> Más </button>
                        : null
                    }
                </div>
                <p></p>
            </div>
        </div>
    )

}

export default Container;