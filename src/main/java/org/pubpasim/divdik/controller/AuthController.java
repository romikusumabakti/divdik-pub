package org.pubpasim.divdik.controller;

import org.pubpasim.divdik.dto.LoginDto;
import org.pubpasim.divdik.model.Account;
import org.pubpasim.divdik.model.AccountDetails;
import org.pubpasim.divdik.repository.AccountRepository;
import org.pubpasim.divdik.service.AccountDetailsService;
import org.pubpasim.divdik.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    AuthenticationManager authenticationManager;
    AccountDetailsService accountDetailsService;
    AccountRepository accountRepository;
    JwtService jwtService;

    @Autowired
    public AuthController(AuthenticationManager authenticationManager, AccountDetailsService accountDetailsService, AccountRepository accountRepository, JwtService jwtService) {
        this.authenticationManager = authenticationManager;
        this.accountDetailsService = accountDetailsService;
        this.accountRepository = accountRepository;
        this.jwtService = jwtService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDto loginDto) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginDto.getUsername(), loginDto.getPassword()));
            UserDetails userDetails = accountDetailsService.loadUserByUsername(loginDto.getUsername());
            String token = jwtService.create(userDetails.getUsername());
            return ResponseEntity.ok(token);
        } catch (BadCredentialsException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @GetMapping("/account")
    public Account account() {
        return ((AccountDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getAccount();
    }

    @PostMapping("/logout")
    public Boolean logout() {
        return true;
    }

}