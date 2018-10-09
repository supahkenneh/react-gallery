import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadPhoto } from '../actions/photoActions';

class PhotoPage extends Component {

  componentDidMount() {
    this.props.loadPhoto(this.props.match.params.id);
  }

  render() {
    if (this.props.photo) {
      return (
        <div className="photo-detail-container">
          <div className="image-container">
            <img src={this.props.photo.link} alt="" />
          </div>
          <div className="details-container">
            <div>@{this.props.photo.owner && this.props.photo.owner.username}</div>
            <div>{this.props.photo && this.props.photo.description}</div>
          </div>
        </div>
      );
    }
    return (
      <div>Error loading photo</div>
    )
  }
}

const mapStateToProps = state => ({
  photo: state.photos,
})

export default connect(mapStateToProps, { loadPhoto })(PhotoPage);