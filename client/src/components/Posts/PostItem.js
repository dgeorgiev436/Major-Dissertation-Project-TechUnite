import React, { Fragment } from "react"
import PropTypes from "prop-types"
import {connect} from "react-redux"
import { Link } from "react-router-dom"
import Moment from "react-moment"
import {addLike, removeLike, deletePost} from "../../actions/post"


const PostItem = ({deletePost, addLike, removeLike, post: { _id, text, name, avatar, user, likes, comments, date} , showActions, auth }) => {
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
            <p className="my-1">{text}</p>
             <p className="post-date"><Moment format="DD//MM/YY">{date}</Moment></p>
			  
			{showActions && (
			 <Fragment>
				<button onClick={ () => addLike(_id)} type="button" className="btn btn-light">
					<i className="fas fa-thumbs-up">{" "}</i><span> {likes.length > 0 && (
						<span>{likes.length}</span>)}
					</span>
				  </button>
				<button onClick={ () => removeLike(_id)} type="button" className="btn btn-light"><i className="fas fa-thumbs-down"></i></button>
				<Link to={`/posts/${_id}`} className="btn btn-primary"> Discussion {comments.length > 0 && (
					<span className='comment-count'>{comments.length}</span>
					)}
				</Link>
				{!auth.loading && user === auth.user._id && (
				  <button onClick={(e) => deletePost(_id)} type="button" className="btn btn-danger"> <i className="fas fa-times"></i> </button>
				)} 
			 </Fragment>
			)}
           
          </div>
        </div>
	)
}

PostItem.defaultProps = {
	showActions: true
}

const mapStateToProps = state => ({
	auth: state.auth
})

PostItem.propTypes = {
	post: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
	removeLike: PropTypes.func.isRequired,
	addLike: PropTypes.func.isRequired,
	deletePost: PropTypes.func.isRequired,
	showActions: PropTypes.bool
}

export default connect(mapStateToProps, {removeLike, addLike, deletePost})(PostItem)