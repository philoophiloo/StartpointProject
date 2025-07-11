<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CohortController;
use App\Http\Controllers\API\DocumentController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\TitleController;
use App\Http\Controllers\CompensationTypeController;
use App\Http\Controllers\OpportunityController;
use App\Http\Controllers\OpportunityTypeController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\OpportunityUserController;





// ✅ RESTful API routes
Route::apiResource('cohorts', CohortController::class);
Route::apiResource('documents', DocumentController::class);
Route::apiResource('departments', DepartmentController::class);
Route::apiResource('titles', TitleController::class);
Route::apiResource('compensation-types', CompensationTypeController::class);
Route::apiResource('opportunities', OpportunityController::class);
Route::apiResource('opportunity-types', OpportunityTypeController::class);
Route::apiResource('users', UserController::class);
Route::apiResource('opportunity-user', OpportunityUserController::class);




// ✅ Custom routes
Route::patch('documents/{id}/deactivate', [DocumentController::class, 'deactivate']);
Route::get('/ping', fn() => response()->json(['message' => 'API is working']));




