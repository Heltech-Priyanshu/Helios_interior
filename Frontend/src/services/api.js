import   { API_URL }  from "../config/config";

export const companyDetails = {
  createCompany: `${API_URL}/createcompany`,
  getCompany: `${API_URL}/getcompany`,
  updateCompany : `${API_URL}/updatecompany`,
};

export const carouselDetails = {
  getCarousel: `${API_URL}/getcarousel`,
  createCarousel: `${API_URL}/createcarousel`,
  updateCarousel: `${API_URL}/updatecarousel/:id`,
  deleteCarousel: `${API_URL}/deletecarousel/:id`,
};

export const contactDetails = {
  getContact: `${API_URL}/getallcontact`,
  createContact: `${API_URL}/createcontact`,
  deletecontact: `${API_URL}/deletecontact`,
}

export const faqsDetails = {
  getFaqs: `${API_URL}/getallfaq`,
  createFaq: `${API_URL}/createfaq`,
  deleteFaq: `${API_URL}/deletefaq`,
}

export const Slider= {
  getcarousel: `${API_URL}/getcarousel`,
  createcarousel: `${API_URL}/createcarousel`,
  deletecarousel: `${API_URL}/deletecarousel`,
}

export const Logindata = {
   login: `${API_URL}/login`
}


export const ServiceData = {
  getservice: `${API_URL}/getallservice`,
  createservice: `${API_URL}/createservice`,
  deleteservice: `${API_URL}/deleteservice`,
  updateservice: `${API_URL}/updateservice`,
}

export const GalleryData = {
  getgallery: `${API_URL}/getallgallery`,
  creategallery: `${API_URL}/creategallery`,
  deletegallery: `${API_URL}/deletegallery`,
  updategallery: `${API_URL}/updategallery`,
}