import React, {Fragment} from "react"
import PropTypes from "prop-types"
import {connect} from "react-redux"
import {deleteComment} from "../../actions/post"
import {Link} from "react-router-dom"
import Moment from "react-moment"

const CommentForm = ({auth, deleteComment, postId, comment: {_id, text, name, avatar, user, date} }) => {

	const deleteItemHandler = () => {
		deleteComment(postId, _id)
	}
	
	return(
		<div className="post bg-white p-1 my-1">
          <div className="thumbnail">
            <Link to={`/profile/${user}`}>
              <img
                className="round-img"
                src={avatar}
                alt=""
              />
              <h4>{name}</h4>
			</Link>
          </div>
          <div>
            <p className="my-1"> {text} </p>
             <p className="post-date">Posted on <Moment format="YYYY/MM/DD">{date}</Moment></p>
			 {!auth.loading && user === auth.user._id && (
				  <button type="button" className="btn btn-danger" onClick={() => deleteComment(postId, _id)}>
					  <i className="fas fa-times"></i>
				  </button>
			 )}
          </div>
        </div>
	)
}

const mapStateToProps = state => ({
	auth: state.auth
})

CommentForm.propTypes = {
	auth: PropTypes.object.isRequired,
	comment: PropTypes.object.isRequired,
	deleteComment: PropTypes.func.isRequired
	// postId: PropTypes.number.isRequired
}

export default connect(mapStateToProps, {deleteComment})(CommentForm)