import React, { useState } from 'react'
import axios from 'axios'
import Book from './Book'
import './PostList.css';
import { useEffect } from 'react';

const PostList = (props) => {
    const [posts, setPosts] = useState([]);
    const [maxPrice, setMaxPrice] = useState('');
    const [author, setAuthor] = useState('');
    const [publisher, setPublisher] = useState('');
    const [filteredPosts, setFilteredPosts] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/books/")
            .then(res => {
                setPosts(res.data);
                setFilteredPosts(res.data);
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    const handleFilter = () => {
        let filtered = posts;
        if (maxPrice) {
            filtered = filtered.filter(post => post.price <= maxPrice);
        }
        if (author) {
            filtered = filtered.filter(post => post.author.toLowerCase().includes(author.toLowerCase()));
        }
        if (publisher) {
            filtered = filtered.filter(post => post.publisher.toLowerCase().includes(publisher.toLowerCase()));
        }
        setFilteredPosts(filtered);
    }

    return (
        <div>
            <div className='postlist-filters'>
                <span className='filter-label'>Max Price</span>
                <input
                    className='postlist-filter'
                    type="text"
                    name="maxPrice"
                    value={maxPrice}
                    onChange={e => setMaxPrice(e.target.value)}
                ></input>
                <span className='filter-label'>Author</span>
                <input
                    className='postlist-filter'
                    type="text"
                    name="author"
                    value={author}
                    onChange={e => setAuthor(e.target.value)}
                ></input>
                <span className='filter-label'>Publisher</span>
                <input
                    className='postlist-filter'
                    type="text"
                    name="publisher"
                    value={publisher}
                    onChange={e => { setPublisher(e.target.value) }}
                ></input>
                <button onClick={handleFilter}>Filter</button>
            </div>
            <div className='postlist-container'>
                {
                    filteredPosts.length ?
                        filteredPosts.map(post =>
                            <div key={post.title} className="ListItem">
                                <Book
                                    book={post}
                                    onAddItem={props.onAddItem}
                                />
                            </div>
                        ) :
                        null
                }
            </div>
        </div>
    )
}

export default PostList
