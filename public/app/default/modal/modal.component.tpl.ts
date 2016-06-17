export var modalComponentTpl = `
<button class="btn btn-primary" (click)="lgModal.show()">Large modal</button>

<div
    bsModal
    #lgModal="bs-modal"
    class="modal fade"
    tabindex="-1"
    role="dialog"
    aria-labelledby="myLargeModalLabel"
    aria-hidden="true">
    
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
    
                <div class="modal-header">
                    <button
                        type="button"
                        class="close"
                        (click)="lgModal.hide()"
                        aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                        
                    <h4 class="modal-title">Sign in</h4>
                </div>
    
                <div class="modal-body">
                    <form (submit)="onSubmitted(); lgModal.hide()">
                      <div class="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input
                            [(ngModel)]="userCredentials.email"
                            type="email"
                            class="form-control"
                            id="exampleInputEmail1"
                            placeholder="Email">
                      </div>
                      
                      <div class="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input
                            [(ngModel)]="userCredentials.password"
                            type="password"
                            class="form-control"
                            id="exampleInputPassword1"
                            placeholder="Password">
                      </div>
                      
                      <button type="submit" class="btn btn-default">Submit</button>
                    </form>
                </div>
                
            </div>
        </div>
</div>
`;