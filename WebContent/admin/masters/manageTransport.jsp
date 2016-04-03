<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<div class="row">
  <div class="col-md-8 col-md-offset-2">
    <div class = 'row'>
      <div class = 'col-md-8 col-md-offset-3'>
        <div id = 'message'></div>
      </div>
    </div>
    <div class = 'row'>
      <div class="nav-tabs-custom">
        <ul class="nav nav-tabs"  style = "margin-top : 20px">
            <li class="active"><a href="#newRoute" data-toggle="tab">Add New Route</a></li>
            <li><a href="#action" data-toggle="tab" id = "actionTab">Action</a></li>
        </ul>
        
        <div class="tab-content">
            <div class="tab-pane active" id="newRoute">
              
              <form role="form" id = 'newRouteForm'>
                <div class="box-body">
                  <div class="form-group">
                    <label for="routeNo">Route No : </label>
                    <input type="text" class="form-control" id="routeNo" name = 'routeNo'>
                    <span class = 'help-block' style = 'color : red' id = 'routeNoError'></span>
                  </div>

                  

                  <div class="form-group">
                    <label for="to">To : </label>
                    <input type="text" class="form-control" id="to" name = 'to'>
                    <span class = 'help-block' style = 'color : red' id = 'toError'></span>
                  </div>

                  <div class="form-group">
                    <label for="routeNo">Amount : </label>
                    <input type="text" class="form-control" id="amount" name = 'amount' onkeypress="return isNumber(event)">
                    <span class = 'help-block' style = 'color : red' id = 'amountError'></span>
                  </div>
                      
                </div><!-- /.box-body -->

                <div class="box-footer">
                      <button type="button" class="btn btn-success pull-right" id = 'addRouteBTN'><i class = 'fa fa-plus'></i>&nbsp; Add Route</button>
                      <button type="reset" class="btn btn-danger pull-left"><i class = 'fa fa-refresh fa-spin'></i>&nbsp; Reset</button>
                </div>
              </form>
            </div><!-- /.tab-pane -->
            <div class="tab-pane" id="action">
              <div class = 'box-body'>
                <table id="routesTable" class="table table-bordered table-striped">
                    <thead>
                      <tr>
                        <th>S. No</th>
                        <th> Route No </th>
                        
                        <th> To </th>
                        <th> Amount </th>
                        <th> Status </th>
                        <th> Action </th>
                      </tr>
                    </thead>
                    <tbody>
                      <?php
                        $getAllRoutes = "SELECT * from all_routes";
                        $result = $db->query($getAllRoutes);
                        $count = 0;
                        $htmlString = "";
                        while($row = $result->fetch_assoc())
                        {
                          $routeID = $row['routeID'];
                          $to = $row['toStop'];
                          $routeNo = $row['routeNo'];
                          $amount = $row['amount'];
                          if($row['status'] == 'y')
                          {
                            $statusString = "<span style = 'color : green'>Active</span>";
                            $buttonString = "<div class='dropdown'><button class='btn btn-warning dropdown-toggle' type='button' data-toggle='dropdown'><i class = 'fa fa-gears'></i></button>".
                           "<ul class='dropdown-menu'>".
                             "<li role='presentation'><a role='menuitem' tabindex='-1' href='#' onclick = 'edit(\"$routeID\",\"$to\",\"$routeNo\",\"$amount\")' data-toggle='modal' data-target='#editModal'><i class = 'fa fa-edit' style = 'color : blue'></i> &nbsp; Edit </a></li>".
                             "<li role='presentation'><a role='menuitem' tabindex='-1' href='#' onclick = inactivate('".$routeID."')><i class = 'fa fa-close' style = 'color : yellow'></i> &nbsp;     Inactive </a></li>".
                             "<li role='presentation'><a role='menuitem' tabindex='-1' href='#' onclick = delete('".$routeID."')><i class = 'fa fa-trash-o' style = 'color : red'></i> &nbsp; Delete </a></li>".
"</ul></div>";
                          }
                          else
                          {
                            $statusString = "<span style = 'color : red'>Inactive</span>"; 
                            $buttonString = "<div class='dropdown'><button class='btn btn-warning dropdown-toggle' type='button' data-toggle='dropdown'><i class = 'fa fa-gears'></i></button>".
                           "<ul class='dropdown-menu'>".
                             "<li role='presentation'><a role='menuitem' tabindex='-1' href='#' onclick = 'edit(\"$routeID\",\"$to\",\"$routeNo\",\"$amount\")' data-toggle='modal' data-target='#editModal'><i class = 'fa fa-edit' style = 'color : blue'></i> &nbsp; Edit </a></li>".
                             "<li role='presentation'><a role='menuitem' tabindex='-1' href='#' onclick = activate('".$routeID."')><i class = 'fa fa-check' style = 'color : yellow'></i> &nbsp; Active </a></li>".
                             "<li role='presentation'><a role='menuitem' tabindex='-1' href='#' onclick = delete('".$routeID."')><i class = 'fa fa-trash-o' style = 'color : red'></i> &nbsp; Delete </a></li>".
"</ul></div>";
                          }
              
                          $htmlString .= "<tr><td>".++$count."</td><td>".$routeNo."</td><td>".$to."</td><td>".$amount."</td><td>".$statusString."</td><td>".$buttonString."</td></tr>";
                        }
                        echo $htmlString;
                      ?>
                    </tbody>
                  </table>
              </div>     
            </div><!-- /.tab-pane -->
            
        </div><!-- /.tab-content -->
      </div><!-- nav-tabs-custom -->
    </div> <!-- internal row -->  

    
  </div><!-- /.col -->

  <form id = 'editForm' name = 'editForm'>
     <div id="editModal" class="modal fade" role="dialog">

        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title"> Edit Routes </h4>
                </div>
                <div class="modal-body">

                      <div class = "row">

                          <div class = "col-md-10 col-md-offset-1 col-xs-10 col-xs-offset-1 col-lg-10 col-lg-offset-1 col-sm-10 col-sm-offset-1">

                              <!-- form starts -->

                                  <div class="box-body">
                                      <div class="form-group">
                                          <label for="routeNo"> Route No </label>
                                          <input type="text" class="form-control" id="routeNoEdit" name = "routeNo">
                                          <span class = 'help-block' id = 'routeNoEditError' style = 'color : red'></span>
                                          <input type="hidden" class="form-control" id="routeID" name = "routeID">
                                      </div>
                                      <div class="form-group">
                                          <label for="to">To </label>
                                          <input type="text" class="form-control" id="toEdit" name = "to">
                                          <span class = 'help-block' id = 'toEditError' style = 'color : red'></span>
                                      </div>
                                      <div class="form-group">
                                          <label for="amount"> Amount </label>
                                          <input type="text" class="form-control" id="amountEdit" name = "amount" onkeypress="return isNumber(event)">
                                          <span class = 'help-block' id = 'amountEditError' style = 'color : red'></span>
                                      </div>
                                      
                                  </div><!-- /.box-body -->
                              <!--</form>-->
                          </div>
                      </div>  <!-- row for form ends -->

                </div>
                <div class="modal-footer">
                    <!-- data-toggle="modal" data-target="#surveyModal3" -->
                    <span id = 'editFooter' class = 'pull-left' style="margin-left: 20px"></span>
                    <button type="button" class="btn btn-success pull-right" id = "saveEdited"> Save &nbsp; <i class = "fa fa-thumbs-o-up"></i></button>

                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->

    </div><!-- /#editModal -->
  </form>



</div> <!-- /.row -->

<!-- jQuery Script for admin Module JS -->
<script src = 'assets/js/admin/transportProcess.js'></script>
 



