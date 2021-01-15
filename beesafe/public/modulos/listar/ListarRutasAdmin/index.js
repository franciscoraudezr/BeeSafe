let table = document.getElementById('contenidoTablaRutas');


    async function getListarRutas() {
        var response = await fetch('/listarRutas/recibir');
        var data = await response.json();
        return data;
    }//fin de getListarRutas
    
    async function deleteListarRutas() {
    
      let id = localStorage.getItem('id');
      var enlace = ('/eliminarRutas/borrar/' + id);
      const res = await fetch(enlace, {
          method: 'DELETE',
          headers: {
              "Content-Type": "application/json"
          }
      });
      var data = await res.json();
      return data;
    
    }//fin de deleteListarRutas 
    
    document.addEventListener("DOMContentLoaded", async function renderListarRutas() {
    
        let listarRutas = await getListarRutas();
        console.log(listarRutas);
      
        for (let i = 0; i < listarRutas.length; i++) {
      
      
          let tr = document.createElement("tr");
          
          //nombreRuta
          let td_nombreRuta = document.createElement("td");
          let texto_nombreRuta = document.createTextNode
            (listarRutas[i].nombre);
          td_nombreRuta.appendChild(texto_nombreRuta);
          tr.appendChild(td_nombreRuta);
          table.appendChild(tr);
        
          //cordenadasRuta
          /* let td_cordenadasRuta = document.createElement("td");
          let texto_cordenadasRuta = document.createTextNode
            (listarRutas[i].coordenada);
          td_cordenadasRuta.appendChild(texto_cordenadasRuta);
          tr.appendChild(td_cordenadasRuta);
          table.appendChild(tr); */
        
          //estado
          let td_estado = document.createElement("td");
          let texto_estado = document.createTextNode
            (listarRutas[i].estado==1?'Activa':'Deshabilitada');
          td_estado.appendChild(texto_estado);
          tr.appendChild(td_estado);
          table.appendChild(tr);
        
         /*  //modificar
          let td_modificar = document.createElement("td");
          let anchor_modificar = document.createElement("a");
          anchor_modificar.classList.add("iconoEditarBorrar");
        
          let image_modificar = document.createElement("img");
          image_modificar.setAttribute("src", "../../../assets/img/edit.png");
          anchor_modificar.appendChild(image_modificar);
        
          anchor_modificar.addEventListener('click', () => {
            localStorage.setItem('id', listarRutas[i]._id);
            /* window.location.href = '../../modificar/modificarTipoVehiculoEspecializado/index.html'; /
          });
        
          td_modificar.appendChild(anchor_modificar);
          tr.appendChild(td_modificar);
          table.appendChild(tr);
         */
          //eliminar
        
          let td_eliminar = document.createElement("td");
          let anchor_eliminar = document.createElement("a");
          anchor_eliminar.classList.add("iconoEditarBorrar");
        
          let image_eliminar = document.createElement("img");
          image_eliminar.setAttribute("src", "../../../assets/img/delete.png");
          anchor_eliminar.appendChild(image_eliminar);
        
          anchor_eliminar.addEventListener('click', () => {
            localStorage.setItem('id', listarRutas[i]._id);
            borrarlistarRutas();
          });
        
          td_eliminar.appendChild(anchor_eliminar);
          tr.appendChild(td_eliminar);
          table.appendChild(tr);
        }
      
      }); //fin de renderListarRutas
      
    
    
    
        function buscar() {
            var input, filter, table, tr, td, i, txtValue;
            input = document.getElementById("inputBuscar");
            filter = input.value.toUpperCase();
            table = document.getElementById("contenidoTablaRutas");
            tr = table.getElementsByTagName("tr");
            for (i = 0; i < tr.length; i++) {
              td = tr[i].getElementsByTagName("td")[0];
              if (td) {
                txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                  tr[i].style.display = "";
                } else {
                  tr[i].style.display = "none";
                }
              }
            }
          }
    
          async function borrarlistarRutas() {
            var response = await deleteListarRutas()
            console.log(response);
            /* location.reload(); */
            window.location.reload(true);
            }