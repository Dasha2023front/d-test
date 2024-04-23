
$(document).ready(function () {
  $(".slider-for").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: ".slider-nav",
  });
  $(".slider-nav").slick({
    slidesToShow: 7,
    slidesToScroll: 1,
    asNavFor: ".slider-for",
    dots: true,
    // centerMode: true,
    focusOnSelect: true,
    initialSlide: 0,
    variableWidth: true,
    swipe: true
  });
});

const validate = new JustValidate("#form", {
  errorLabelStyle: {
    color: "#EF6461",
  },
});

const phone = document.querySelector("#phone");
const button = document.querySelector(".form__btn");
const im = new Inputmask("+7(999)999-99-99");
im.mask(phone);

validate
  .addField("#name", [
    {
      rule: "required",
      errorMessage: "Введите имя",
    },
    {
      rule: "customRegexp",
      value: /[A-Za-zА-яЁё]/gi,
      errorMessage: "Недопустимый формат",
    },
    {
      rule: "minLength",
      value: 2,
      errorMessage: "Минимум 2 символа",
    },
  ])
  // .addField("#email", [
  //   {
  //     rule: "required",
  //     errorMessage: "Введите email",
  //   },
  //   {
  //     rule: "email",
  //     errorMessage: "Ошибка email",
  //   },
  // ])
  .addField("#phone", [
    {
      validator: (value) => {
        const num = phone.inputmask.unmaskedvalue();
        return Boolean(Number(num) && num.length > 0);
      },
      errorMessage: "Введите телефон",
    },
    {
      validator: (value) => {
        const num = phone.inputmask.unmaskedvalue();
        return Boolean(Number(num) && num.length === 10);
      },
      errorMessage: "Введите телефон полностью",
    },
  ])
  .onSuccess((event) => {
    const formData = new FormData(document.getElementById("form"));
    fetch("https://httpbin.org/post", {
      method: "POST",
      body: formData,
    })
      .then(function (response) {
        if (response.ok) {
          document.getElementById("form").reset();
          button.disabled = "true";
          $.fancybox.close();
          $.fancybox.open({
            src: "#hidden_success",
            type: "inline",
          });
          setTimeout(function () {
            // $.fancybox.close();
          }, 5000);
        }
      })
      .catch(function (error) {
        console.error("Ошибка:", error);
      });
  });

$(function () {
  $("form").on("change input paste", "input", function (e) {
    $("#submit").prop("disabled", !$("#name").val() || !$("#phone").val());
  });
});

$("#btn").click(function () {
  $.fancybox.open({
    src: "#hidden",
    type: "inline",
  });
});

// fav

let fav = document.querySelector('.icons__icon');

fav.addEventListener('click', () => {
  fav.classList.toggle("active");
})
