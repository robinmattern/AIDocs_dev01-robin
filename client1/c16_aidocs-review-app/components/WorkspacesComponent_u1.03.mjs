// import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
   import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
// import { LitElement, html, css, unsafeHTML } from 'https://cdn.jsdelivr.net/npm/@polymer/lit-html/lit-html.min.js';
// import { LitElement, html, css, unsafeHTML } from 'https://cdn.jsdelivr.net/npm/@polymer/lit-html';
// import { html, render          } from 'https://unpkg.com/lit-html?module'; import { unsafeHTML } [1]
// import { html, css, unsafeHTML } from 'lit-html';
// import { unsafeHTML } from 'https://unpkg.com/lit-html@^3';
// import { Directive  } from 'https://cdn.jsdelivr.net/npm/lit-html@1.4.1/directive.js'
// import { html       } from 'https://cdn.jsdelivr.net/npm/lit-html@1.4.1/lit-html.js'
// import { unsafeHTML } from 'https://cdn.jsdelivr.net/npm/lit-html@3.1.2/lit-html.js'
   import { unsafeHTML } from 'https://cdn.jsdelivr.net/npm/lit-html@3.1.2/directives/unsafe-html.mjs'

   import   setWorkspaces            from '../models/WorkspacesData_u1.03.mjs'    // .(40402.06.3) 
//-------------------------------------------------------------------------------

//  var aHTML = await setWorkspace( ); // console.log( aHTML )   // Var aHTML is not defined inside component

  class WorkspacesComponent_ extends LitElement {

    static get styles() {
      return css`
        #WorkspaceList {
          position        : relative;
          top             : 10px;
          text-align      : right;
          margin-right    : 10px;
          }
        #WorkspaceLabel {
          padding-right   : 0px;
          }
        select option {
          height: 15px;
          padding-left: 20px;
          min-height: 15px;
          font-family:    serif;
          font-size : 20px;
        }
        select {
          line-height:    45px;
          font-family:    serif;
          font-size : 20px;
        }
        table {
          position        : relative;  /* absolute; */
          top             : 15px;
          left            : 750px;
          border          : 1px solid blue;
          }
        tr {
          background-color: lightblue;
          }
        `;
        }
//      ---------------------------------------------------------

//  static get properties() { }
//      ---------------------------------------------------------

      constructor() {
        super();
        this.HTML = '';                           // Initialize aHTML within the component
        this.fetchAndRenderWorkspaces();          // Call the method to fetch data and render
        } // eof constructor
//      ---------------------------------------------------------

  async fetchAndRenderWorkspaces() {
    try {
    var aHTML     =  await setWorkspaces( );      // Call setWorkspace inside a method
        this.HTML =  aHTML;                       // Assign the result to aHTML property
//      this.HTML =  "<div>Hello</div>"           // Don't show it
        this.requestUpdate( );                    // Trigger a re-render
    } catch (error) {
        console.error( 'Error fetching workspace data:', error );
        }
        }
//      ---------------------------------------------------------

  render( ) {
 return html`
    <div id="WorkspaceList">
       <b id="WorkspaceLabel">Use Workspace:</b>
       ${ unsafeHTML( this.HTML ) }
    </div>
    `;
        } // eof render
//      ---------------------------------------------------------
      } // eof WorkspacesComponent_
//  -------------------------------------------------------------------------------

    customElements.define( 'workspaces-component', WorkspacesComponent_ );

    export class WorkspacesComponent extends WorkspacesComponent_ { }


