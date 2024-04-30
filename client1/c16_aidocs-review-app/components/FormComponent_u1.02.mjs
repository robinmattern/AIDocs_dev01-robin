/*\ . . . .
##=========+====================+================================================+
##RD        Form Component      | For AIDocs-Review Chat App
##RFILE    +====================+=======+===============+======+=================+
##FD   FormComponent.mjs        |   7453|  4/08/24  7:45|   153| u1.02`40408.0745
##FD   FormComponent.mjs        |   7596|  4/12/24 15:17|   155| u1.02`40412.1517
##FD   FormComponent.mjs        |   8364|  4/21/24 21:30|   179| u1.02`40421.2130
##FD   FormComponent.mjs        |   8690|  4/26/24 09:30|   182| u1.02`40426.0930
##DESC     .--------------------+-------+---------------+------+-----------------+
#           This JavaScript Lit Component file creates the HTML tag form-component.
#           It is defined in the class FormComponent that includes styles that
#           are local to the component.
##LIC      .--------------------+----------------------------------------------+
#           Copyright (c) 2024 8020-Data_formR * Released under
#           MIT License: http://www.opensource.org/licenses/mit-license.php
##FNCS     .--------------------+----------------------------------------------+
#           FormComponent          extends LitElement class
#             connectedCallback
#             disconnectedCallback
#             handleSubmit
#             render
#           Alert
##CHGS     .--------------------+----------------------------------------------+
# .(40405.05  4/05/24 RAM  5:30p|  Add bNoAlert to browser Alert()
# .(40405.06  4/05/24 RAM  6:30p|  Add bNoAlert to browser Alert()
# .(40408.03  4/08/24 RAM  7:45a|  Clear Prompt Form Field
# .(40412.01  4/12/24 RAM  3:17p|  Add JPT's Doc Header Info
# .(40422.03  4/21/24 RAM  9:30p|  Import Msg Comp failed on Mac
# .(40426.01  4/26/24 RJS  9:30a|  Style Changes
# .(40429.02  4/29/24 RJS 10:00a|  Move .documents without <hr>
# .(40429.03  4/29/24 RJS 10:03a|  Change color to grey 
# .(40429.04  4/29/24 RJS 10:00a|  Change font size
                                |
##SRCE     +====================+===============================================+
\*/
   import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
   import { setPromptValue        } from '../utils/GlobalState_u1.02.mjs';  // Import setPromptValue"
// import { MessagesComponent     } from './MessagesComponent.mjs';         // .(40422.03.1 RAM Indeed, Assuming MessagesComponent is in the same directory)

//----------------------------------------------------------------
    var bNoAlert = true                                                                                     // .(40405.06.1)

class FormComponent extends LitElement {

  static get styles( ) {
    return css`

      form {
        display         :  flex;
        margin-top      :  20px;
        }

      label {
        display         :  inline-block;
        font-family     :  sans-serif;
        font-size       :  14px;
        padding-top     :  5px;
        width:          :  280px;
        padding-left    :  35px;                                        /* .(40426.01.1 RJS Style changes, was 15px;) */
        }

      button {
        font-family     :  sans-serif;
        font-size       :  14px;
        box-shadow      :  0px 1px 3px #000000;
        border          :  1px solid #ddd;  /* or #ccc */
        border-radius   :  5px;
        height          : 27px;
        padding         :  5px;             /* was 20px; or 10px; */
        }

      .fld-text {
        flex            :  1;
        color           :  #333;
        width           :  780px;                                       /* .(40426.01.2 RJS Added width) */
        max-width       :  780px;                                       /* .(40426.01.2 RJS Was: 700px;) */ 
        min-width       :  340px;
        height          :  15px;
        margin          :  0 auto;
        margin-left     :  4px;
        margin-right    :  6px;
        padding         :  5px;             /* was 20px; or 10px; */

        border          :  2px solid #ddd;  /* or #ccc */
        border-radius   :  5px;
/*      box-shadow      :  0px 1px 3px #000000; */
        border-style    :  inset;

        background-color:  #DDDDDD;                                     /* .(40429.03.2 RJS light gray Was #9ad8e3 Light blue) */
        font-family     :  sans-serif;
        font-size       :  1rem;                                        /* .(40429.04.2 RJS Change font size was 14px;) */ 
        font-weight     :  500;                                         /* .(40429.04.3 RJS) */
        }
      .prompt {
        color           :  blue;
        font-size       :  1.3rem;
        font-weight     :  700;
        padding-bottom  :  10px;
      }
/*
      hr {                                                              /*#.(40429.02.1 RJS Beg Don't Add  <HR> ) */
        color           : blue;
        width           : 90%;
        height          : 0px;
        margin          : auto;
      }
 *//*                                                                   /* .(40429.02.2 RJS Beg Add .Documents ) */
      .Documents {
        position        :  relative;
        padding-left    :  40px;
        padding-bottom  :  5px;
        padding-top     :  20px;
        text-align      :  left;  
        border-top      :  blue solid 2px;
        }
      .DocumentTitle {
      color             :  black;
      font-size         :  1rem;
        }
      .DocumentText {
      color             :  blue;
      font-size         :  1.2rem;
/*    text-decoration   :  underline; */
      background-color  :  yellow;
        }                                                               /* .(40429.02.2 RJS End) */               


      @media only screen
      and (max-width: 440px)
      {
        .fld-text {
          max-width       :  0px;
        }
        .prompt {
          font-size       :  1.2rem;
          font-weight     :  700;
          padding-bottom  :  10px;
          margin-left     :   0px;
        }
      }

    ` }; // eof get Styles
//  -------------------------------------------------------

    f01_prompt = ''; // Initialize the name property directly

//  -------------------------------------------------------

  connectedCallback() {
    super.connectedCallback();
    const observer = new MutationObserver(() => this.requestUpdate());
    observer.observe( this, { childList: true } );
    }
//  -------------------------------------------------------

  disconnectedCallback() {
    super.disconnectedCallback();  // Disconnect the observer when the component is removed
    observer.disconnect();
    }
//  -------------------------------------------------------

  handleSubmit(event) {
    event.preventDefault();
        console.log( `  Prompt: ${ this.f01_prompt }` );
    if (this.f01_prompt > "") {

        setPromptValue( this.f01_prompt ); // Update global state // not necessary

//const messagesComponent = this.shadowRoot?.querySelector( 'messages-component' ); // Assuming MessagesComponent is within FormComponent's shadow DOM
  const messagesComponent =         document.querySelector( 'messages-component' ); // Assuming MessagesComponent is within the parent's HTML DOM
    if (messagesComponent) {
        Alert( "Executing populateMessages( promptValue ) from the FormComponent",    bNoAlert )            // .(40405.05.9).(40405.06.2)
        messagesComponent.populateMessages( this.f01_prompt ); // Trigger message population
        }
        Alert( `Prompt has been sent to the MessagesComponent.populateMessages( )}.`, bNoAlert )            // .(40405.05.10).(40405.06.3)
//      this.Prompt = "";                                                                                   //#.(40408.03.1 RAM Clear the form after submit)
//      this.f01_prompt = ""                                                                                //#.(40408.03.1 RAM Like this, no workie)
//      document.getElementById('f01_prompt').value = ""                                                    //#.(40408.03.1 RAM Like this, no workie either)
        this.shadowRoot.getElementById('f01_prompt').value = ""                                             // .(40408.03.1 RAM Like this!!)
    } else {
        Alert( `* Please enter a question!`, -2 );                                                          // .(40405.05.11).(40405.06.4)
        }
    }
//  -------------------------------------------------------

  render() {
    return html`
    <!--<hr style='width:90%; height:0px; color:blue;'>-->                                                <!--#.(40429.02.3 RJS Don's add it) -->
      <div class="Documents">                                                                             <!-- .(40429.02.4 RJS Add .Documents line) -->  
        <span class="DocumentTitle">User Document(s):</span> 
        <span class="DocumentText">&nbsp;GreenbookFY2025.pdf&nbsp;</span>
      </div>                                                                                              <!-- .(40429.02.4 RJS End)
      <form @submit=${ this.handleSubmit}>
        <label for="f01_prompt">&nbsp;<font class="prompt">?</font></label>
<!--    <label for="f01_prompt">&nbsp;Prompt: </label>-->
        <input  id="f01_prompt" type="text" class="fld-text" value=${this.f01_prompt} @change=${ ( e ) => this.f01_prompt = e.target.value}>
        <button type="submit">Send</button>
      </form>
    `;
    }
//  -------------------------------------------------------
  } // eoc FormComponent
//----------------------------------------------------------------

customElements.define( 'form-component', FormComponent );

function Alert( aMsg, bNoAlert_) {                                                  // .(40405.05.8 RAM Beg Write Alert).(40405.06.5 RAM Add NoAlert)
    var bNoAlert1 = (typeof( bNoAlert )  != 'undefined') ? bNoAlert  : false        // .(40405.06.6 RAM Assign bNoAlert1 not bNoAlert_ )
//      bNoAlert_ = (typeof( bNoAlert  ) != 'undefined') ? bNoAlert  : false        //#.(40405.06.7)
        bNoAlert_ = (typeof( bNoAlert_ ) != 'undefined') ? bNoAlert_ : bNoAlert1    // .(40405.06.8 RAM Set default to bNoAlert1 not false)
        bNoAlert_ = ( bNoAlert_ != -2) ? bNoAlert_ : false                          // .(40405.06.9)
    if (bNoAlert_) { console.log( `    ${ aMsg.trim() }` ) } else { alert( aMsg )}  // .(40405.06.10)
        }                                                                           // .(40405.05.8 RAM End)
//  -------------------------------------------------------
/*\
##SRCE     +====================+===============================================+
##=========+====================+================================================+
\*/
