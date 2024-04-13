import React from 'react';
import './DetailBanner.style.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { useMovieVideosQuery } from '../../../../hooks/useMovieVideos';
import VideoPlayer from './VideoPlayer';

const DetailBanner = ({backdrop_path, title, overview, id}) => {

    const { data } = useMovieVideosQuery({id})
    console.log("id ", id, "video ", data)

    const [selectedId, setSelectedId] = useState(0);
    
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const nextVideo=()=>{
        setSelectedId((selectedId + 1) % data.results.length)
    }

  return (
    <div style={{
        backgroundImage:"url(" + `https://www.themoviedb.org/t/p/w1066_and_h600_bestv2${backdrop_path}` + ")"
    }}
    className="detail-banner">
        <div className="text-white detail-banner-text-area">
            <h1>{title}</h1>
            <p className="overview-text">{overview}</p>
            {data && data.results.length != 0 && (
                <Button variant="danger" onClick={handleShow}>
                    재생
                </Button>
            )}
            {data && data.results.length != 0 && (
            <Modal 
                size="lg" 
                show={show} 
                onHide={handleClose}
                 
                >
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body className="video-center">
                    <VideoPlayer videoId={data?.results[selectedId].key} />
                </Modal.Body>
                <Modal.Footer>
                <p className="video-text" onClick={nextVideo}>next!! {data?.results[(selectedId + 1) % data.results.length].name}</p>
                </Modal.Footer>
            </Modal>
            )}
        </div>
    </div>
  )
}

export default DetailBanner