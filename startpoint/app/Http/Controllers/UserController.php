<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    // List all users
    public function index()
    {
        return response()->json(User::all());
    }

    // Store new user
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:50',
            'first_name' => 'required|string|max:50',
            'middle_name' => 'nullable|string|max:50',
            'last_name' => 'required|string|max:50',
            'phone_number' => 'required|string|max:30',
            'cohort' => 'required|string|max:150',
            'email_address' => 'required|email|unique:users,email_address',
            'password' => 'required|string|min:6',
            'is_active' => 'boolean',
            'created_by' => 'nullable|string|max:200',
        ]);

        $validated['password'] = Hash::make($validated['password']);

        $user = User::create($validated);
        return response()->json($user, 201);
    }

    // Show specific user
    public function show($id)
    {
        $user = User::find($id);
        return $user
            ? response()->json($user)
            : response()->json(['message' => 'User not found'], 404);
    }

    // Update user
    public function update(Request $request, $id)
    {
        $user = User::find($id);
        if (!$user) return response()->json(['message' => 'User not found'], 404);

        $validated = $request->validate([
            'title' => 'sometimes|string|max:50',
            'first_name' => 'sometimes|string|max:50',
            'middle_name' => 'nullable|string|max:50',
            'last_name' => 'sometimes|string|max:50',
            'phone_number' => 'sometimes|string|max:30',
            'cohort' => 'sometimes|string|max:150',
            'email_address' => 'sometimes|email|unique:users,email_address,' . $id,
            'password' => 'sometimes|string|min:6',
            'is_active' => 'boolean',
            'created_by' => 'nullable|string|max:200',
        ]);

        if (isset($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        }

        $user->update($validated);
        return response()->json($user);
    }

    // Delete user
    public function destroy($id)
    {
        $user = User::find($id);
        if (!$user) return response()->json(['message' => 'User not found'], 404);

        $user->delete();
        return response()->json(['message' => 'User deleted successfully']);
    }
}
