import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import SingleTrack from "./SingleTrack";

const AlbumPage = () => {
    const params = useParams();
    const [albumToShow, setAlbumToShow] = useState(null);

    let headers = new Headers({
        "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
        "X-RapidAPI-Key": "9d408f0366mshab3b0fd8e5ecdf7p1b09f2jsne682a1797fa0",
    });

    const fetchAlbum = async () => {
        try {
            const response = await fetch(
            `https://striveschool-api.herokuapp.com/api/deezer/album/${params.id}`,
            {
                method: "GET",
                headers: headers,
            }
        );
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            setAlbumToShow(data);
        } else {
            alert("Something went wrong");
        }
    } catch (error) {
        console.log(error);
    }
};

    useEffect(() => {
        fetchAlbum();
    }, [params.id]);

    return (
        <div>
            {albumToShow ? (
            <Container fluid id="mainPage">
                <Row>
                <Col md={3} className="pt-5 text-center" id="img-container">
                    <img
                    src={albumToShow.cover}
                    className="card-img img-fluid"
                    alt="Album"
                    />
                    <div className="mt-4 text-center">
                    <p className="album-title">{albumToShow.title}</p>
                    </div>
                    <div className="text-center">
                    <Link
                        to={"/artist/" + albumToShow.artist.id}
                        className="artist-name"
                    >
                        {albumToShow.artist.name}
                    </Link>
                    </div>
                    <div className="mt-4 text-center">
                    <button id="btnPlay" className="btn btn-success" type="button">
                        Play
                    </button>
                    </div>
                </Col>
                <Col md={8} className="p-md-5">
                    <Row>
                    <Col md={10} className="mb-5" id="trackList">
                        {albumToShow.tracks.data.map((track) => {
                        return (
                            <SingleTrack key={track.id} track={track} />
                        );
                        })}
                    </Col>
                    </Row>
                </Col>
                </Row>
            </Container>
            ) : null}
        </div>
    );
};

export default AlbumPage;
