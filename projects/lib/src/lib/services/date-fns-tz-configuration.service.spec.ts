import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { de } from 'date-fns/locale';
import { DateFnsTzConfigurationService } from './date-fns-tz-configuration.service';
import { provideDateFnsTz } from '../provider';
import { FormatInTimeZonePipe } from '../pipes';

@Component({
    template: `
    <p id="global">{{ date | dfnsFormatInTimeZone: null:'EEE MMM d yyyy HH:mm:ss zzz' }}</p>
  `,
    standalone: false
})
class TestHostComponent {
  date?: Date;
}

describe('DateFnsConfigurationService', () => {
  let service: DateFnsTzConfigurationService;
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormatInTimeZonePipe],
      providers: [provideDateFnsTz(), FormatInTimeZonePipe],
      declarations: [TestHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    service = TestBed.inject(DateFnsTzConfigurationService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should use global setting in DateFnsTzConfigurationService', () => {
    service.timeZone = 'UTC';
    component.date = new Date('2022-08-25T10:40:20Z');
    element = fixture.nativeElement.querySelector('#global');
    fixture.detectChanges();
    expect(element.textContent).toBe('Thu Aug 25 2022 10:40:20 UTC');
  });

  it('should display German date on global locale & timezone change', () => {
    service.locale = de;
    service.timeZone = 'Europe/Berlin';
    component.date = new Date('2022-08-25T10:46:20Z');
    element = fixture.nativeElement.querySelector('#global');
    fixture.detectChanges();
    expect(element.textContent).toBe('Do. Aug. 25 2022 12:46:20 MESZ');
  });
});
