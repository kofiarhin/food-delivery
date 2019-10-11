import React from "react";
import { Link } from "react-router-dom";
import "./restMenuTemplate.sass";

const RestMenuTemplate = ({ menuData, handleSubmit }) => {

    const role = sessionStorage.getItem("role");

    //  --- TODO ---
    //if role is customer display cta

    const renderCta = (menuItem) => {

        const role = sessionStorage.getItem("role");

        return role === "customer" ? <form onSubmit={(event) => handleSubmit(event)}>
            <input type="hidden" name="item" value={menuItem.id} />
            <input type="hidden" name="name" value={menuItem.name} />
            <input type="hidden" name="price" value={menuItem.price} />
            <input type="hidden" name="fileUrl" value={menuItem.cover.fileUrl} />
            <button type="submit" className='cta'> Add to Cart </ button>
        </form > : null;
    }

    const renderMenuItems = (category, menuData) => {

        return menuData.map(menuItem => {

            return menuItem.category === category ? <div className="menu-item">

                <div className="avatar" style={{
                    backgroundImage: `url(${menuItem.cover.fileUrl})`,

                }}></div>
                <div className="desc">
                    <p className="item-name"> {menuItem.name} </p>
                    <p className="item-price">Price: GHC{menuItem.price} </p>
                </div>
                <div className="menu-item-content">
                    {renderCta(menuItem)}
                </div>
            </div> : null;
        })

    }

    const renderMenu = () => {

        const categories = getCategories(menuData);

        let template = null;

        template = categories.map(category => {

            return <div>
                <div className='menu-unit'>
                    <h2 className="cat-name">  {category}</h2>
                    <div className="menu-content">
                        <div className="content">
                            {renderMenuItems(category, menuData)}
                        </div>
                    </div>
                </div>

            </div>
        })

        return template;
    }

    const getCategories = () => {

        const category = menuData.map(data => {

            return data.category;
        })

        const data = [... new Set(category)];

        return data;

    }

    return <div className="menu-wrapper">  {renderMenu()}</div>
}

export default RestMenuTemplate;