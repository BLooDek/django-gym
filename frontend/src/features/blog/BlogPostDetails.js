import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { blogFetcher } from "./blogApi";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  ChevronLeftIcon,
  SparklesIcon,
  TrashIcon,
} from "@heroicons/react/solid";
import EditBlogPostDialog from "./EditBlogPostDialog";

import { setEditDialog, setBlogPosts, setBlogUrl } from "./blogState";

export default function BlogPostDetails() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState(null);
  let params = useParams();
  const dispatch = useDispatch();
  const detailsUrl = `http://127.0.0.1:8000/blog/details/${params.id}/`;
  const firstPageUrl = "http://127.0.0.1:8000/blog/all/";
  const globalUrl = useSelector((state) => state.blogState.blogUrl);
  const isAdmin = useSelector(
    (state) => state.isLogged.credentials?.["is_staff"]
  );

  function setGlobalItems(data) {
    dispatch(setBlogPosts(data));
  }

  

  useEffect(() => {
    blogFetcher(detailsUrl, "GET", setItems, setIsLoaded, setError, null);
  }, [detailsUrl]);
  function handleEdit(data) {
    blogFetcher(detailsUrl, "PATCH", setItems, setIsLoaded, setError, data);
    dispatch(setEditDialog(false));
  }
  function handleDelete() {
    const data = {
      id: params.id,
    };
    dispatch(setBlogUrl(firstPageUrl));
    blogFetcher(globalUrl, "DELETE", setGlobalItems, null, null, data);
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        <EditBlogPostDialog postId={params.id} handleEdit={handleEdit} />
        <div className="fixed left-5 top-20">
          <Link id="BlogPostDetailsBack" to="/django-gym" className="btn-blog">
            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            Back
          </Link>
          {isAdmin && (
            <span
              id="BlogPostDetailsEdit"
              onClick={() => dispatch(setEditDialog(true))}
              className="btn-blog"
            >
              <SparklesIcon className="h-5 w-5" aria-hidden="true" />
              Edit
            </span>
          )}
          {isAdmin && (
            <Link
              id="BlogPostDetailsDelete"
              to="/django-gym"
              className="btn-blog bg-red-600 hover:bg-red-500"
              onClick={handleDelete}
            >
              <TrashIcon className="h-5 w-5" aria-hidden="true" />
              Delete
            </Link>
          )}
        </div>
        <div className="flex items-center space-x-2 text-2xl xl:w-1/2 lg:w-3/4 w-full mx-auto text-cente py-10">
          <img
            className="w-10 h-10 rounded-full"
            src={require("../../profile.png")}
            alt=""
          />
          <div className="space-y-1 font-medium text-white">
            <div>by {items?.author.username}</div>
            <div className="text-sm text-gray-300">
              on {new Date(items?.created).toLocaleString()}
            </div>
          </div>
        </div>

        {items?.title && (
          <h2
            id="blogPostTitle"
            className="text-5xl xl:w-1/2 lg:w-3/4 w-full mx-auto text-cente text-white"
          >
            {items?.title}
          </h2>
        )}

        {items?.body && (
          <div
            id="blogPostBody"
            className="xl:w-1/2 lg:w-3/4 w-full mx-auto text-cente my-5 link-blue text-gray-300"
            dangerouslySetInnerHTML={{ __html: items.body }}
          ></div>
        )}
      </>
    );
  }
}
