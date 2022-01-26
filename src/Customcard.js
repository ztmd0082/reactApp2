import React from 'react';
import {
    Card, CardImg, CardBody,
    CardTitle, CardSubtitle, CardText, Button
} from 'reactstrap';
import Rating from 'react-rating';

const Customcard = (props) => {
    return props.dataList.map((item, i) => {
        return (
            <div class="col-3">
                <Card outline={true} class="p-1">
                    <CardBody class="p-0">
                        <CardImg top width="250px" height="250px" src={item.image} alt="image" class="mb-1"/>
                        <hr/>
                        <div class="d-flex col-12">
                            <div class="col-md-6">
                                Category
                            </div>
                            <div class="col-md-6 text-uppercase text-primary">
                                {item.category}
                            </div>
                        </div>
                        <hr/>
                        <CardTitle className="h5 mb-2 pt-2 font-weight-bold text-dark">
                            <div class="border border-secondary rounded-circle d-none">{item.id}</div>
                            {item.title}</CardTitle>
                        <CardSubtitle className="text-secondary mb-3 font-weight-light text-uppercase" style={{ fontSize: '0.8rem' }}>{item.description}</CardSubtitle>
                        <div class="col-12">{item.price} Only/-</div>
                        {/* <CardText className="text-secondary mb-4" style={{ fontSize: '0.75rem' }}>count:{item.rating.count}</CardText> */}
                        {/* placeholderSymbol={<img src="assets/images/star-red.png" className="icon" />} */}
                        <div class="d-flex">
                        <Rating
                            placeholderRating={item.rating.rate}
                            emptySymbol={<img src="https://dreyescat.github.io/react-rating/assets/images/star-grey.png" className="icon" />}
                            placeholderSymbol={<img src="https://dreyescat.github.io/react-rating/assets/images/star-red.png" className="icon" />}
                            fullSymbol={<img src="https://dreyescat.github.io/react-rating/assets/images/star-yellow.png" className="icon" />}
                        />
                        <div class="col-1 text-danger bg-warning h6 m-1 text-center">{item.rating.count}</div>
                        </div>
                        <div id="addcart">Add to Cart
                        <img src="https://th.bing.com/th/id/OIP.Ag3L6xTZW6rxy10XpD1eAwHaHP?pid=ImgDet&rs=1" className="cartimg" />

                        </div>
                        {/* <Button color="success" className="font-weight-bold">Lorem Ipsum</Button> */}
                    </CardBody>
                </Card>
            </div>
        );
    });
};
export default Customcard;
