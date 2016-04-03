<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<section class="sidebar">
          <!-- Sidebar user panel -->
          <div class="user-panel">
            <div class="pull-left image">
              <img src="${sessionScope.user.imagePath}" class="img-circle" alt="User Image">
            </div>
            <div class="pull-left info">
              <p>${sessionScope.user.name}</p>
              <a href="#"><i class="fa fa-circle text-success"></i> Online</a>
            </div>
          </div>
          <!-- search form -->
          <!-- <form action="#" method="get" class="sidebar-form">
            <div class="input-group">
              <input type="text" name="q" class="form-control" placeholder="Search...">
              <span class="input-group-btn">
                <button type="submit" name="search" id="search-btn" class="btn btn-flat"><i class="fa fa-search"></i></button>
              </span>
            </div>
          </form> -->
          <!-- /.search form -->
          <!-- sidebar menu: : style can be found in sidebar.less -->
          <ul class="sidebar-menu">
            <li class="header">ERP NAVIGATION</li>
            <li class="active">
              <a ui-sref = 'home'>
                <i class="fa fa-dashboard"></i> <span>Dashboard</span> 
              </a>
            
            </li>
            <li>
              <a ui-sref = 'createUsers'>
                <i class="fa fa-users"></i> <span>Create Users</span> 
              </a>
            
            </li>
            <li>
              <a ui-sref = 'settings'>
                <i class="fa fa-cog fa-fw"></i> <span>General Settings</span> 
              </a>
            
            </li>
            
            <li class="treeview">
              <a href="#">
                <i class="fa fa-share"></i> <span> Admin Section </span>
                <i class="fa fa-angle-left pull-right"></i>
              </a>
              <ul class="treeview-menu">
                
                <li>
                  <a href="#"><i class="fa fa-circle-o"></i> Student Registration <i class="fa fa-angle-left pull-right"></i></a>
                  <ul class="treeview-menu">
                    <li><a ui-sref="application" id = 'applicationFormLI'><i class="fa fa-th"></i>Enquiry</a></li>
                    <li><a ui-sref="registration" id = 'registrationLI'><i class="fa fa-circle-o"></i>Registration</a></li>
                    <!-- <li>
                      <a href="#"><i class="fa fa-circle-o"></i><i class="fa fa-angle-left pull-right"></i></a>
                      <ul class="treeview-menu">
                        <li><a href="#"><i class="fa fa-circle-o"></i> Level Three</a></li>
                        <li><a href="#"><i class="fa fa-circle-o"></i> Level Three</a></li>
                      </ul>
                    </li> -->
                  </ul>
                </li>
                <li>
                  <a href="#"><i class="fa fa-circle-o"></i> Teacher Registration</a>
                </li>
                <li class="treeview">
                  <a href="#">
                    <i class="fa fa-share"></i> <span> Manage Masters</span>
                    <i class="fa fa-angle-left pull-right"></i>
                  </a>
                  <ul class="treeview-menu">
                    
                    <li>
                      <a ui-sref = "manageClass" id = 'manageClassLI'><i class="fa fa-circle-o"></i>Manage Class</a>
                    </li>
                    <li>
                      <a ui-sref = "manageDivisions" id = 'manageDivLI'><i class="fa fa-circle-o"></i>Manage Divisions</a>
                    </li>
                    <li>
	                  <a href="#"><i class="fa fa-circle-o"></i>Manage Subjects <i class="fa fa-angle-left pull-right"></i></a>
	                  <ul class="treeview-menu">
	                    <li><a ui-sref="manageSubjects" id = 'manageSubjectsLI'><i class="fa fa-th"></i>Subjects Master</a></li>
	                    <li><a ui-sref="assignSubjects" id = 'assignSubjectsLI'><i class="fa fa-circle-o"></i>Assign to Class</a></li>
	                    <!-- <li>
	                      <a href="#"><i class="fa fa-circle-o"></i><i class="fa fa-angle-left pull-right"></i></a>
	                      <ul class="treeview-menu">
	                        <li><a href="#"><i class="fa fa-circle-o"></i> Level Three</a></li>
	                        <li><a href="#"><i class="fa fa-circle-o"></i> Level Three</a></li>
	                      </ul>
	                    </li> -->
	                  </ul>
	                </li>
	                <li>
                      <a ui-sref = "manageDesignation" id = 'manageDesignationLI'><i class="fa fa-circle-o"></i>Manage Designations</a>
                    </li>
                    <li>
                      <a ui-sref = "manageReligion" id = 'manageReligionLI'><i class="fa fa-circle-o"></i>Manage Religion</a>
                    </li>
                    <li>
                      <a ui-sref = "manageNationality" id = 'manageNationalityLI'><i class="fa fa-circle-o"></i>Manage Nationality</a>
                    </li>
                    
                    
                    <li>
                      <a ui-sref = "manageState" id = 'manageStateLI'><i class="fa fa-circle-o"></i> Manage States</a>
                    </li>
                  </ul>
                </li>
                
                <li class="treeview">
                  <a href="#">
                    <i class="fa fa-share"></i> <span> Transport </span>
                    <i class="fa fa-angle-left pull-right"></i>
                  </a>
                  <ul class="treeview-menu">
                    
                    <li>
                      <a ui-sref = "allVehicles" id = 'allVehiclesLI'><i class="fa fa-circle-o"></i>All Vehicles</a>
                    </li>
                    <li>
                      <a ui-sref = "vehicleDetails" id = 'vehicleDetailsLI'><i class="fa fa-circle-o"></i>Vehicle Details Entry</a>
                    </li>
                    
	                <li>
                      <a ui-sref = "stops" id = 'allStopsLI'><i class="fa fa-circle-o"></i>All Stops</a>
                    </li>
                  </ul>
                </li>
                
              </ul>
            </li>

            <!-- fee module menu -->
            <li class="treeview">
              <a href="#">
                <i class="fa fa-indent nav_icon"></i> <span> Fee </span>
                <i class="fa fa-angle-left pull-right"></i>
              </a>
              <ul class="treeview-menu">
                    <li>
                    <a href="#" id = 'feeMaster'><i class="fa fa-circle-o"></i>Fee Master</a>
                    </li>
                     <li>
                      <a href="#" id = 'feeStructure'><i class="fa fa-circle-o"></i> Fee Structure</a>
                      </li>
                      <li>
                      <a href="#" id = 'feeFine'><i class="fa fa-circle-o"></i>Fee Fine</a>
                      </li>
                      <li>
                          <a href="#" id = 'feeSetting'><i class="fa fa-circle-o"></i> Fee Setting </a>
                        </li>
                        <li>
                          <a href="#" id = 'search'><i class="fa fa-circle-o"></i> Search  </a>
                        </li>
                        <li>
                          <a href="#" id = 'addFeeReciept'><i class="fa fa-circle-o"></i> Add Fee Reciept</a>
                        </li>
                        <li>
                          <a href="#" id = 'updateFeeReciept'><i class="fa fa-circle-o"></i> Update Fee Reciept </a>
                        </li>
                        <li>
                          <a href="#" id = 'addBankEntry'><i class="fa fa-circle-o"></i> Add Bank Entry </a>
                        </li>
                        <li>
                          <a href="#" id = 'updateBankEntry'><i class="fa fa-circle-o"></i> Update Bank Entry </a>
                        </li>
                        <li>
                          <a href="#" id = 'defaulterList'><i class="fa fa-circle-o"></i> Defaulter List </a>
                        </li>
                        <li>
                          <a href="#" id = 'dayBook'><i class="fa fa-circle-o"></i> day Book </a>
                        </li>
                        <li>
                          <a href="#" id = 'feeCollection'><i class="fa fa-circle-o"></i> Fee Collection </a>
                        </li>
                        <li>
                          <a href="#" id = 'bankLedger'><i class="fa fa-circle-o"></i> Bank Ledger </a>
                        </li>
              </ul>
           </li>

          <li class="treeview">
              <a href="#">
                <i class="fa fa-indent nav_icon"></i> <span> Academic </span>
                <i class="fa fa-angle-left pull-right"></i>
              </a>
              <ul class="treeview-menu">
                <li class="treeview">
                  <a href="#">
                    <i class="fa fa-share"></i> <span> Manage Masters</span>
                    <i class="fa fa-angle-left pull-right"></i>
                  </a>
                  <ul class="treeview-menu">
                    
                    <li>
                      <a ui-sref = 'assignment' id = 'assignment'><i class="fa fa-circle-o"></i>Assignment</a>
                    </li>
                    <li>
                      <a href="#" id = 'gsmLI'><i class="fa fa-circle-o"></i>Grade System Master</a>
                    </li>
                    <li>
                      <a href="#" id = 'ssmLI'><i class="fa fa-circle-o"></i>Subject Summary Master</a>
                    </li>
                    <li>
                      <a href="#" id = 'dimLI'><i class="fa fa-circle-o"></i>Descriptive Indicator Master</a>
                    </li>
                  </ul>
                </li>
              </ul>
           </li>


          </ul>
</section>