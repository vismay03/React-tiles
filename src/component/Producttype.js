import React from 'react';

const Producttype = ({ name, reverse }) => {
    return (
        <div>
            <div  className={ reverse ? 'product-box flex flex-col-reverse items-center' : 'product-box flex flex-col items-center' }   >
                <img src="img/ceramic-body.png" alt="" />
                <p  className={ reverse ? "text-center bg-button text-base-200 px-10 py-3  -mb-7" : "text-center bg-button text-base-200 px-10 py-3  -mt-7"}  >{name}</p>
            </div>
        </div>
    );
}

export default Producttype;
