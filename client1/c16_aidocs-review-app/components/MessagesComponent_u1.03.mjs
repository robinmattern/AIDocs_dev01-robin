  import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
//import { unsafeCSS             } from 'https://cdn.jsdelivr.net/npm/lit-html@3.1.2/directives/unsafe-css.js'
  import { getPromptValue        } from '../utils/GlobalState_u1.02.mjs';
  import   MessagesFns             from '../utils/getData_u1.03.mjs'

  //-------------------------------------------------------------------------------
    var aUserColor = '#AAA' // '#9ad8e3'  // Light blue
    var aAsstColor = '#CCC' // '#338b33'  // Dark Green

function setColor( aColor, aWhere ) {
      if (`${aWhere}`.match(/^f/)) {
return (aColor.substr(1,1) <= 7) ? '#000' : '#FFF' }
return  aColor
        }

  class MessagesComponent_ extends LitElement {

    static get styles() {
      return css`
      //  -------------------------------------------------------
      :host {
        --User-BkgnColor      : #9ad8e3; /* #AAA     #9ad8e3; Light blue */
        --User-FontColor      : #333;    /* #000     #333;    Dark */
        --Assistant-BkgnColor : #338b33; /* #CCC     #338b33; Dark green */
        --Assistant-FontColor : #fff;;   /* #000     #fff;;   White */
         }
        #spacer {
          height          :  20px;
          }
        #messages-container_x {
          display         :  flex;
          width           :  80%;
          flex-direction  :  column;
          margin          :  0 auto;
          padding         :  20px;
          border          :  1px solid #ddd;
          border-radius   :  5px;
          }

        .message {
          flex            :  1;
          max-width       :  650px;
          min-width       :  300px;
          min-height      :  15px;
          margin          :  5px auto;
          margin-left     :  4px;
          margin-right    :  6px;
          padding         :  5px;             /* was 20px; or 10px; */

          border          :  2px solid #ddd;  /* or #ccc */
          border-radius   :  5px;
  /*      box-shadow      :  0px 1px 3px #000000; */
          border-style    :  inset;

          font-family     :  sans-serif;
          font-size       :  14px;
          }

        .user-message {
          background-color: #9ad8e3;  /* var(--User-BkgnColor);  */
          color           : #000;     /* var(--User-FontColor);  */
          text-align      : right;
          margin-left     : 52px;
          }

        .assistant-message {
          background-color: #338b33; /* var(--Assistant-BkgnColor); */
          color           : #fff;    /* var(--Assistant-FontColor); */
          text-align      : left;
          }
      `;
      }
//    ---------------------------------------------------------

    static get properties() {
        return { messages: { type: Array } };
        }
//    ---------------------------------------------------------

    constructor( ) {
        super();
/*
    var pMessages =
         [ { role: 'user',      message: "What's up" },
         , { role: 'assistant', message: "Not much" },
         , { role: 'user',      message: "What's really up" },
         , { role: 'assistant', message: "Really not much" },
             ];
*/
        this.NoAlert  = true
        this.Messages = []
//      this.fetchMessages( "" );        										// Call the method to fetch data

        } // eof constructor
//    ---------------------------------------------------------

async fetchMessages( aPromptValue ) {
  try {
        this.Alert( `Fetching messages for, '${aPromptValue}'` )

    var pMessages     =  await MessagesFns.getChatMessages( aPromptValue, this.Messages )
        this.Alert( `Received ${ pMessages.length / 2 } from MessagesFns.getChatMessages()` )

        this.Messages =  pMessages;
        this.requestUpdate( );                    								// Trigger a re-render
      } catch (error) {
          console.error( 'Error fetching messages data:', error );
          }
        }
//    ---------------------------------------------------------

async populateMessages( aPromptValue ) {
        aPromptValue = aPromptValue ? aPromptValue : await getPromptValue( ); 	// don't use const to redefine promptValue

        this.Alert( `Received prompt, '${aPromptValue}', in the MessagesComponent` )

        await this.fetchMessages( aPromptValue );        						// Call the method to fetch data
        this.Alert( `Fetched messages for, '${aPromptValue}', in the MessagesComponent` )
        }
//    ---------------------------------------------------------
    render() {
      return html`
        <div id="spacer"></div>
        <div id="messages-container">
          ${this.Messages.map( ( message ) => this.renderMessage( message ) ) }
        </div>
        `;
        }
//    ---------------------------------------------------------

    renderMessage( message ) {
      return html`
        <div class="message ${ message.role === 'user' ? 'user-message' : 'assistant-message'}">
          ${ message.message }
        </div>
        `;
        }
//    ---------------------------------------------------------

    Alert( aMsg ) {
        if (this.NoAlert) { console.log( `    ${aMsg.trim()}` ) } else { alert( aMsg )}
        }
//    ---------------------------------------------------------
}
//  -------------------------------------------------------------------------------

    customElements.define( 'messages-component', MessagesComponent_ );

    export class MessagesComponent extends MessagesComponent_ { }

