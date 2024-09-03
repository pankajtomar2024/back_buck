import Gifting from "@/components/gifting/gifting";
import { AboutUs } from "@/components/about-us/aboutus.component";
import NewVarietyCarousel from "@/components/new-variety-carousel/newvariety";
import { OurProduct } from "@/components/our-product/ourProduct";
import TeaTime from "@/components/teatime";
import TestimonialCarousel from "@/components/testimonial";
import { Box } from "@mui/material";
import { OurBestSeller } from "@/components/bestseller/bestseller";
import OrderOnline from "@/components/orderonline/orderonline";

const HomePage = () => {
  return (
    <>
      <NewVarietyCarousel></NewVarietyCarousel>
      <AboutUs></AboutUs>
      <OurProduct></OurProduct>
      <Gifting></Gifting>
      <TeaTime></TeaTime>
      <Box>
        <TestimonialCarousel></TestimonialCarousel>
      </Box>
      <OurBestSeller></OurBestSeller>
      <OrderOnline></OrderOnline>
    </>
  );
};

export default HomePage;
