import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import CollectionItem from '../../components/collection-item/collection-item.component';
import { selectCollection } from '../../redux/shop/shop.selector';

import './collection.styles.scss';

const CollectionPage = ({ collection }) => {
    const { collectionId } = useParams(); // Get collectionId from URL parameters

    console.log(collectionId, collection)

    if (!collection) {
        return <div>Collection not found</div>; // Fallback if the collection doesn't exist
    }

    const { title, items } = collection;

    return (
        <div className='collection-page'>
            <h2 className='title'>{title}</h2>
            <div className='items'>
                {items.map(item => (
                    <CollectionItem key={item.id} item={item} />
                ))}
            </div>
        </div>
    );
}

const mapStateToProps = (state, ownProps) => {
    const { collectionId } = ownProps; // Now collectionId comes from the props passed by the component
    return {
        collection: selectCollection(collectionId)(state),
    };
};

export default connect(mapStateToProps)(CollectionPage);
