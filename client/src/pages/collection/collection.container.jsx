import { connect } from 'react-redux';
import { compose } from 'redux';
import { useParams } from 'react-router-dom';

import { selectIsCollectionsLoaded, selectCollection } from '../../redux/shop/shop.selector';
import WithSpinner from '../../components/with-spinner/with-spinner.component';
import CollectionPage from './collection.component';

const CollectionPageContainer = (props) => {
  // Get collectionId from URL params using useParams hook
  const { collectionId } = useParams();
  
  return <CollectionPage {...props} collectionId={collectionId} />;
};

const mapStateToProps = (state, ownProps) => {
  const { collectionId } = ownProps; // Own props now includes collectionId
  return {
    isLoading: !selectIsCollectionsLoaded(state),
    collection: selectCollection(collectionId)(state), // Pass selected collection based on collectionId
  };
};

export default compose(
  connect(mapStateToProps),
  WithSpinner
)(CollectionPageContainer);
