import { useState, useEffect } from "react";
import { blogFetcher, url } from "./blogApi";
import BlogPostMini from "./BlogPostMini";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DocumentAddIcon,
  ChevronDoubleLeftIcon,
} from "@heroicons/react/solid";
import { useSelector, useDispatch } from "react-redux";
import { setAddDialog, setBlogUrl, setBlogPosts } from "./blogState";
import AddBlogPostDialog from "./AddBlogPostDialog";

export default function Blog({ setCurrentPage }) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const isAdmin = useSelector(
    (state) => state.isLogged.credentials?.["is_staff"]
  );
  const dispatch = useDispatch();

  const localUrl = useSelector((state) => state.blogState.blogUrl);
  const items = useSelector((state) => state.blogState.posts);

  useEffect(() => {
    blogFetcher(localUrl, "GET", setItems, setIsLoaded, setError, null);
  }, [localUrl]);

  useEffect(() => {
    setCurrentPage("Blog");
  }, [setCurrentPage]);

  function setItems(data) {
    dispatch(setBlogPosts(data));
  }

  function handleNext() {
    dispatch(setBlogUrl(items.next));
  }
  function handlePrev() {
    dispatch(setBlogUrl(items.previous));
  }
  function handleGoToStart() {
    dispatch(setBlogUrl(url.getAll));
  }
  
  function handleAdd(data) {
    blogFetcher(localUrl, "POST", setItems, setIsLoaded, setError, data);
    dispatch(setAddDialog(false));
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        <AddBlogPostDialog handleAdd={handleAdd} />
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-wrap -m-4">
              {items?.results &&
                items.results.map((i) => <BlogPostMini key={i.id} post={i} />)}
            </div>
          </div>
          <div className="flex justify-end my-5 mx-4">
            <nav
              className=" z-0 inline-flex  rounded-md shadow-sm"
              aria-label="Pagination"
            >
              {isAdmin && (
                <button
                  id="OpenAddBlogPostDialog"
                  onClick={() => dispatch(setAddDialog(true))}
                  className="relative btn-blog"
                >
                  Add post
                  <DocumentAddIcon
                    className="h-5 w-5 mx-2"
                    aria-hidden="true"
                  />
                </button>
              )}
              <button
                disabled={!items?.previous}
                id="BlogStartButton"
                onClick={handleGoToStart}
                className="relative btn-blog"
              >
                <ChevronDoubleLeftIcon className="h-5 w-5" aria-hidden="true" />
                Start
              </button>
              <button
                disabled={!items?.previous}
                id="BlogPrevButton"
                onClick={handlePrev}
                className="relative btn-blog"
              >
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                Previous
              </button>

              <button
                disabled={!items?.next}
                id="BlogNextButton"
                onClick={handleNext}
                className="relative btn-blog"
              >
                Next
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </nav>
          </div>
        </section>
      </>
    );
  }
}
