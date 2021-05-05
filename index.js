$(function(){
    $("#bra").click(function(){
    $("#bracelet").show()
    $("#collier, #boucle, #bague").hide()
  });
  $("#col").click(function(){
    $("#collier").show()
    $("#bracelet, #boucle, #bague").hide()
  });
  $("#bcl").click(function(){
    $("#boucle").show()
    $("#bracelet, #collier, #bague").hide()
  });
  $("#bag").click(function(){
    $("#bague").show()
    $("#bracelet, #boucle, #collier").hide()
  });
  })

 $(document).ready(function(){
  $('.owl-carousel').owlCarousel({
    autoplay:true,
    loop:true
  })
  });

// initialisation d'un tableau vide pour stocker les valeur du clique " ajouter au panier"
let tableCart = []

if (sessionStorage.getItem('tableCart')  != undefined) {
  badge()
  displayCart()
}

// Au clique on push l'objet "contentCar" dans le tableau
$('.add-to-cart').click(function() {

  if(sessionStorage.getItem('tableCart')) {
    tableCart = JSON.parse(sessionStorage.getItem('tableCart'));
  } else {
    tableCart = []
  }



    let $this = $(this);
    let id = $this.attr('data-id')
    let name = $this.attr('data-name')
    let price = parseInt($this.attr('data-price'))
    let qte = parseInt($this.attr('data-qte'))

    let newArticle = true

    tableCart.forEach(function(element) {
      // si l'article est déjà présent, on incrémente la quantité
      if (element.id == id) {
          newArticle = false;
          element.qte += qte;
      }
    })

      if (newArticle) {
        tableCart.push({
          id: id,
          name: name,
          price: price,
          qte: qte,
        })
    }

    // on stock le le tableau d'objet dans le sessionStorage
    sessionStorage.setItem('tableCart',JSON.stringify(tableCart))    
    badge()
})

// remplissage de la modal pour quelle soit prete lors de l'apel 

function displayCart() {
  
  let subTt = 0
  $('#article-modal').text('article');
  $('#price-modal').text('prix');
  $('#qte-modal').text('qte');
  //$('.subtotal').text('')

  if(sessionStorage.getItem('tableCart')  != undefined) {
    subGrandTotal = 0
    JSON.parse(sessionStorage.getItem('tableCart')).forEach((element) => {
      articles = '<p>'+element.name+'</p>'
      $('#article-modal').append(articles);
      let itemPrice = element.price * 1000
      subTotal = (itemPrice * element.qte) / 1000
      price = '<p>'+subTotal+'</p>'
      $('#price-modal').append(price)
      qte = '<p>'+element.qte+'</p>'
      $('#qte-modal').append(qte)
      subGrandTotal += subTotal
    })
    $('.subtotal').append(subGrandTotal)
  }
  
}

// appel de la modal au click  
$('.buy').click(function() {
  $('.subtotal').empty()
 displayCart()
})

function badge() {
  if(sessionStorage.getItem('tableCart',JSON.stringify(tableCart))  == undefined) {
    $('.badge').text(0);
  } else {
    let total = JSON.parse(sessionStorage.getItem('tableCart')).reduce((acc, qte ) => acc += qte.qte , 0)
      $('.badge').text(total);
    };
  }

$('.clearCart').click(function() {
  $('.subtotal').empty()
  sessionStorage.clear();
  displayCart()
  badge()
})
